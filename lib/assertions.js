var React = require('react');

var INTERACTIVE = {
  'button': true,
  'a' (props) {
    return typeof props.href === 'string';
  }
};

var hasAlt = (props) => {
  return typeof props.alt === 'string';
};

var altIsRedundant = (alt) => {
  return alt.match('image');
};

var isInteractive = (tagName, props) => {
  var tag = INTERACTIVE[tagName];
  return (typeof tagName === 'function') ? tag(props) : tag;
};

var hasClick = (props) => {
  return typeof props.onClick === 'function';
};

var hasRole = (props) => {
  return typeof props.role === 'string';
};

var hasTabIndex = (props) => {
  return typeof props.tabIndex === 'string';
};

var needsAriaRole = (tagName, props) => {
  return (
    !isInteractive(tagName, props) &&
    hasClick(props) &&
    !hasRole(props)
  );
};

var needsTabIndex = (tagName, props) => {
  return (
    !isInteractive(tagName, props) &&
    hasClick(props) &&
    !hasTabIndex(props)
  );
};

var hrefIsHash = (props) => {
  return props.href === '#';
};

var needsButtonRole = (props) => {
  return (
    hasClick(props) &&
    hrefIsHash(props)
  );
};


var hasLabel = (props) => {
  return typeof props['aria-label'] === 'string';
};

var hasLabelledBy = (props) => {
  return typeof props['aria-labelled-by'] === 'string';
};

var hasChildTextNode = (props, children) => {
  var hasText = false;
  React.Children.forEach(children, (child) => {
    if (hasText)
      return;
    else if (typeof child === 'string')
      hasText = true;
    else if (child.props.children)
      hasText = hasChildTextNode(child.props, child.props.children);
  });
  return hasText;
};

var needsLabel = (props, children) => {
  return (
    hasClick(props) &&
    !(
      hasLabel(props) ||
      hasLabelledBy(props) ||
      hasChildTextNode(props, children)
    )
  );
};

exports.props = {
  onClick: {
    NO_ROLE: {
      msg: 'You have a click handler on a non-interactive element but no `role` DOM property. It will be unclear what this element is supposed to do to a screen-reader user. http://www.w3.org/TR/wai-aria/roles#role_definitions',
      test (tagName, props, children) {
        return !needsAriaRole(tagName, props);
      }
    },

    NO_TABINDEX: {
      msg: 'You have a click handler on a non-interactive element but no `tabIndex` DOM property. The element will not be navigable or interactive by keyboard users. http://www.w3.org/TR/wai-aria-practices/#focus_tabindex',
      test (tagName, props, children) {
        return !needsTabIndex(tagName, props);
      }
    },

    NO_LABEL: {
      msg: 'You have a click handler on an element with no screen-readable text. Add `aria-label` or `aria-labelled-by` attribute, or put some text in the element.',
      test (tagName, props, children) {
        return !needsLabel(props, children);
      }
    },

    BUTTON_ROLE_NO_KEYUP: {
      msg: 'You have `role="button"` but did not define an `onKeyUp` handler. Add it, and have the "Space" key do the same thing as an `onClick` handler.',
      test (tagName, props, children) {
        return !(props.role === 'button' && !props.onKeyUp);
      }
    },

    BUTTON_ROLE_NO_KEYDOWN: {
      msg: 'You have `role="button"` but did not define an `onKeyDown` handler. Add it, and have the "Enter" key do the same thing as an `onClick` handler.',
      test (tagName, props, children) {
        return !(props.role === 'button' && !props.onKeyUp);
      }
    }

  }
};

exports.tags = {
  a: {
    HASH_HREF_NEEDS_BUTTON: {
      msg: 'You have a click handler on an anchor with an `href` DOM property and no `role` DOM property. Add `role="button"` to your markup, or you should probably just use a `<button/>`.',
      test (tagName, props, children) {
        return !needsButtonRole(props);
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
        return !(hasAlt(props) && altIsRedundant(props.alt));
      }
    }
  }
};

