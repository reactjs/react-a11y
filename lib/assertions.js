var after = require('./after');

var React;
var ReactDOM;

exports.setReact = function(_React, _ReactDOM) {
  React = _React;
  ReactDOM = _ReactDOM || React;
};

var INTERACTIVE = {
  'button': true,
  'input' (props) {
    return props.type != 'hidden';
  },
  'textarea': true,
  'select': true,
  'option': true,
  'a' (props) {
    var hasHref = typeof props.href === 'string';
    var hasTabIndex = props.tabIndex != null;
    return (hasHref || !hasHref && hasTabIndex);
  }
};

const presentationRoles = ['presentation', 'none'];

var isHiddenFromAT = (props) => {
  return props['aria-hidden'] == 'true';
};

var hasAlt = (props) => {
  return typeof props.alt === 'string';
};

var isInteractive = (tagName, props) => {
  var tag = INTERACTIVE[tagName];
  return (typeof tag === 'function') ? tag(props) : tag;
};

var getComponents = (children) => {
  var childComponents = [];
  React.Children.forEach(children, function(child) {
    if (child && typeof child.type === 'function')
      childComponents.push(child);
  });
  return childComponents;
};

var hasLabel = (node) => {
  var text = node.tagName.toLowerCase() == 'img' ? node.alt : node.textContent;
  var hasTextContent = text.trim().length > 0;

  var images = node.querySelectorAll('img[alt]');
  images = Array.prototype.slice.call(images);

  var hasAltText = (images.filter((image) => {
    return image.alt.length > 0;
  }).length) > 0;

  return hasTextContent || hasAltText;
};

var assertLabel = function(node, context, failureCB) {
  if (context.passed || node === null)
    return;

  context.passed = hasLabel(node);

  if (!context.passed && context.totalChildren == (++context.childrenTested))
    failureCB();
};

var hasChildTextNode = (props, children, failureCB) => {
  var hasText = false;
  var childComponents = getComponents(children);
  var nChildComponents = childComponents.length;
  var hasChildComponents = nChildComponents > 0;
  var nCurrentComponent = 0;
  var context;

  if (hasChildComponents)
    context = { totalChildren: childComponents.length, childrenTested: 0 };

  React.Children.forEach(children, (child) => {
    if (hasText)
      return;
    else if (child === null)
      return;
    else if (typeof child === 'undefined')
      return;
    else if (typeof child === 'string' || typeof child === 'number')
      hasText = true;
    else if (child.type === 'img' && child.props.alt)
      hasText = true;
    else if (child.props && child.props.children)
      hasText = hasChildTextNode(child.props, child.props.children, failureCB);
    else if (typeof child.type === 'function') {
      // There can be false negatives if one of the children is a Component,
      // as Components' children are inaccessible until it's is rendered.
      // To account for this, check each Component's HTML after it's
      // been mounted.
      after(child.type.prototype, 'componentDidMount', function() {
        assertLabel(ReactDOM.findDOMNode(this), context, failureCB);
      });

      // Return true because the label check is now going to be async
      // (due to the componentDidMount listener) and we want to avoid
      // pre-maturely calling the failure callback.
      hasText = (nChildComponents == ++nCurrentComponent);
    }
  });
  return hasText;
};

exports.mobileExclusions = [
  'NO_TABINDEX',
  'BUTTON_ROLE_SPACE',
  'BUTTON_ROLE_ENTER',
  'TABINDEX_REQUIRED_WHEN_ARIA_HIDDEN'
];

exports.props = {
  onClick: {
    NO_ROLE: {
      msg: 'You have a click handler on a non-interactive element but no `role` DOM property. It will be unclear what this element is supposed to do to a screen-reader user. http://www.w3.org/TR/wai-aria/roles#role_definitions',
      test (tagName, props, children) {
        if (isHiddenFromAT(props))
          return true;

        return !(!isInteractive(tagName, props) && !props.role);
      }
    },

    NO_TABINDEX: {
      msg: 'You have a click handler on a non-interactive element but no `tabIndex` DOM property. The element will not be navigable or interactive by keyboard users. http://www.w3.org/TR/wai-aria-practices/#focus_tabindex',
      test (tagName, props, children) {
        if (isHiddenFromAT(props))
          return true;

        return !(
          !isInteractive(tagName, props) &&
          props.tabIndex == null // tabIndex={0} is valid
        );
      }
    },

    BUTTON_ROLE_SPACE: {
      msg: 'You have `role="button"` but did not define an `onKeyDown` handler. Add it, and have the "Space" key do the same thing as an `onClick` handler.',
      test (tagName, props, children) {
        if (isHiddenFromAT(props))
          return true;

        return !(props.role === 'button' && !props.onKeyDown);
      }
    },

    BUTTON_ROLE_ENTER: {
      msg: 'You have `role="button"` but did not define an `onKeyDown` handler. Add it, and have the "Enter" key do the same thing as an `onClick` handler.',
      test (tagName, props, children) {
        if (isHiddenFromAT(props))
          return true;

        return !(props.role === 'button' && !props.onKeyDown);
      }
    }
  },

  'aria-hidden': {
    'TABINDEX_REQUIRED_WHEN_ARIA_HIDDEN': {
      msg: 'You have `aria-hidden="true"` applied to an interactive element but have not removed it from the tab flow. This could result in a hidden tab stop for users of screen readers.',
      test (tagName, props, children) {
        return !(
          (isInteractive(tagName, props) || (tagName == 'a' && !props.href)) &&
          props['aria-hidden'] == 'true' &&
          props.tabIndex != '-1'
        );
      }
    }
  }
};

exports.tags = {
  a: {
    HASH_HREF_NEEDS_BUTTON: {
      msg: 'You have an anchor with `href="#"` and no `role` DOM property. Add `role="button"` or better yet, use a `<button/>`.',
      test (tagName, props, children) {
        if (isHiddenFromAT(props))
          return true;

        return !(!props.role && props.href === '#');
      }
    },
    TABINDEX_NEEDS_BUTTON: {
      msg: 'You have an anchor with a tabIndex, no `href` and no `role` DOM property. Add `role="button"` or better yet, use a `<button/>`.',
      test (tagName, props, children) {
        if (isHiddenFromAT(props))
          return true;

        return !(!props.role && props.tabIndex != null && !props.href);
      }
    }
  },

  img: {
    MISSING_ALT: {
      msg: 'You forgot an `alt` DOM property on an image. Screen-reader users will not know what it is.',
      test (tagName, props, children) {
        if (isHiddenFromAT(props))
          return true;

        return hasAlt(props);
      }
    },

    REDUNDANT_ALT: {
      // TODO: have some way to set localization strings to match against
      msg: 'Screen-readers already announce `img` tags as an image, you don\'t need to use the word "image" or "picture" in the description',
      test (tagName, props, children) {
        if (isHiddenFromAT(props) || !hasAlt(props))
          return true;

        return !(props.alt.match('image') || props.alt.match('picture'));
      }
    }
  }
};

exports.render = {
  NO_LABEL: {
    msg: 'You have an unlabeled element or control. Add `aria-label` or `aria-labelledby` attribute, or put some text in the element.',
    test (tagName, props, children, failureCB) {
      var isValidSubmit = tagName === "input" && props.type === "submit" && props.value != null;
      if (isHiddenFromAT(props) || presentationRoles.indexOf(props.role) !== -1)
        return;

      if (!(
        isInteractive(tagName, props) ||
        (tagName == 'a' && !props.href) ||
        props.role
        )
      )
        return;

      var failed = !(
        props['aria-label'] ||
        props['aria-labelledby'] ||
        isValidSubmit ||
        (tagName === 'img' && props.alt) ||
        hasChildTextNode(props, children, failureCB)
      );

      if (failed)
        failureCB();
    }
  }

};
