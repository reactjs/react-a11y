var after = require('./after');

var React;

exports.setReact = function(R) {
  React = R;
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

const DEVICE = { 'DESKTOP': 'desktop', 'MOBILE': 'mobile' };

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
  var hasTextContent = node.textContent.trim().length > 0;
  var images = node.querySelectorAll('img[alt]');
  images = Array.prototype.slice.call(images);

  var hasAltText = (images.filter((image) => {
    return image.alt.length > 0;
  }).length) > 0;

  return hasTextContent || hasAltText;
};

var assertLabel = function(node, context, failureCB) {
  if (context.passed)
    return;

  context.passed = hasLabel(node);

  if (!context.passed && context.totalChildren == (++context.childrenTested))
    failureCB();
};

var hasChildTextNode = (props, children, failureCB) => {
  var hasText = false;
  var childComponents = getComponents(children);
  var hasChildComponents = childComponents.length > 0;
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
    else if (typeof child === 'string')
      hasText = true;
    else if (child.type === 'img' && child.props.alt)
      hasText = true;
    else if (child.props.children)
      hasText = hasChildTextNode(child.props, child.props.children, failureCB);
    else if (typeof child.type === 'function') {
      // There can be false negatives if one of the children is a Component,
      // as Components' children are inaccessible until it's is rendered.
      // To account for this, check each Component's HTML after it's
      // been mounted.
      after(child.type.prototype, 'componentDidMount', function() {
        assertLabel(React.findDOMNode(this), context, failureCB);
      });
    }
  });
  return hasText;
};

exports.props = {
  onClick: {
    NO_ROLE: {
      msg: 'You have a click handler on a non-interactive element but no `role` DOM property. It will be unclear what this element is supposed to do to a screen-reader user. http://www.w3.org/TR/wai-aria/roles#role_definitions',
      test (tagName, props, children) {
        return !(!isInteractive(tagName, props) && !props.role);
      }
    },

    NO_TABINDEX: {
      device: DEVICE.DESKTOP,
      msg: 'You have a click handler on a non-interactive element but no `tabIndex` DOM property. The element will not be navigable or interactive by keyboard users. http://www.w3.org/TR/wai-aria-practices/#focus_tabindex',
      test (tagName, props, children) {
        return !(
          !isInteractive(tagName, props) &&
          props.tabIndex == null // tabIndex={0} is valid
        );
      }
    },

    BUTTON_ROLE_SPACE: {
      device: DEVICE.DESKTOP,
      msg: 'You have `role="button"` but did not define an `onKeyDown` handler. Add it, and have the "Space" key do the same thing as an `onClick` handler.',
      test (tagName, props, children) {
        return !(props.role === 'button' && !props.onKeyDown);
      }
    },

    BUTTON_ROLE_ENTER: {
      device: DEVICE.DESKTOP,
      msg: 'You have `role="button"` but did not define an `onKeyDown` handler. Add it, and have the "Enter" key do the same thing as an `onClick` handler.',
      test (tagName, props, children) {
        return !(props.role === 'button' && !props.onKeyDown);
      }
    }

  }
};

exports.tags = {
  a: {
    HASH_HREF_NEEDS_BUTTON: {
      msg: 'You have an anchor with `href="#"` and no `role` DOM property. Add `role="button"` or better yet, use a `<button/>`.',
      test (tagName, props, children) {
        return !(!props.role && props.href === '#');
      }
    },
    TABINDEX_NEEDS_BUTTON: {
      msg: 'You have an anchor with a tabIndex, no `href` and no `role` DOM property. Add `role="button"` or better yet, use a `<button/>`.',
      test (tagName, props, children) {
        return !(!props.role && props.tabIndex !== null && !props.href);
      }
    }
  },

  img: {
    MISSING_ALT: {
      msg: 'You forgot an `alt` DOM property on an image. Screen-reader users will not know what it is.',
      test (tagName, props, children) {
        return hasAlt(props);
      }
    },

    REDUDANT_ALT: {
      // TODO: have some way to set localization strings to match against
      msg: 'Screen-readers already announce `img` tags as an image, you don\'t need to use the word "image" in the description',
      test (tagName, props, children) {
        return !(hasAlt(props) && props.alt.match('image'));
      }
    }
  }
};

exports.render = {
  NO_LABEL: {
    msg: 'You have an unlabled element or control. Add `aria-label` or `aria-labelled-by` attribute, or put some text in the element.',
    test (tagName, props, children, failureCB) {
      if (!(isInteractive(tagName, props) || props.role))
        return;

      var failed = !(
        (isInteractive(tagName, props) || props.role) &&
        (props['aria-label'] ||
        props['aria-labelled-by'] ||
        (tagName === 'img' && props.alt) ||
        hasChildTextNode(props, children, failureCB))
      );

      if (failed)
        failureCB();
    }
  }

};
