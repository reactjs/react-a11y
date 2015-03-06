var React = require('react');

var INTERACTIVE = {
  'button': true,
  'input': true,
  'textarea': true,
  'a' (props) {
    return typeof props.href === 'string';
  }
};

var hasAlt = (props) => {
  return typeof props.alt === 'string';
};

var isInteractive = (tagName, props) => {
  var tag = INTERACTIVE[tagName];
  return (typeof tagName === 'function') ? tag(props) : tag;
};

var hasChildTextNode = (props, children) => {
  var hasText = false;
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
      hasText = hasChildTextNode(child.props, child.props.children);
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
      msg: 'You have a click handler on a non-interactive element but no `tabIndex` DOM property. The element will not be navigable or interactive by keyboard users. http://www.w3.org/TR/wai-aria-practices/#focus_tabindex',
      test (tagName, props, children) {
        return !(
          !isInteractive(tagName, props) &&
          !props.tabIndex
        );
      }
    },

    NO_LABEL: {
      msg: 'You have a click handler on an element with no screen-readable text. Add `aria-label` or `aria-labelled-by` attribute, or put some text in the element.',
      test (tagName, props, children) {
        return (
          props['aria-label'] ||
          props['aria-labelled-by'] ||
          (tagName === 'img' && props.alt) ||
          hasChildTextNode(props, children)
        );
      }
    },

    // onKeyUp is too late to cancel space's default behavior of scrolling the
    // page.
    BUTTON_ROLE_SPACE: {
      msg: 'You have `role="button"` but did not define an `onKeyDown` handler. Add it, and have the "Space" key do the same thing as an `onClick` handler.',
      test (tagName, props, children) {
        return !(props.role === 'button' && !props.onKeyDown);
      }
    },

    // I don't know that it matters if you use onKeyUp or onKeyDown.
    BUTTON_ROLE_ENTER: {
      msg: 'You have `role="button"` but did not define an `onKeyDown` or `onKeyUp` handler. Add it, and have the "Enter" key do the same thing as an `onClick` handler.',
      test (tagName, props, children) {
        return !(props.role === 'button' && !(props.onKeyUp || props.onKeyDown));
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
