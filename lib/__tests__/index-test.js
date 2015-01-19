var React = require('react');
var assert = require('assert');
require('../index')();
var assertions = require('../assertions');

var k = () => {};

var captureWarnings = (fn) => {
  var _warn = console.warn;
  var msgs = {};
  console.warn = (msg) => msgs[msg.replace(/^Warning: /, '')] = true;
  fn();
  console.warn = _warn;
  return msgs;
};

var expectWarning = (expected, fn) => {
  var msgs = captureWarnings(fn);
  assert(msgs[expected], `Did not get expected warning "${expected}"\ngot these warnings:\n${Object.keys(msgs).join('\n')}`);
};

var doNotExpectWarning = (notExpected, fn) => {
  var msgs = captureWarnings(fn);
  assert(msgs[notExpected] == null, `Did not expect a warning but got "${notExpected}"`);
};

describe('props', () => {

  describe('onClick', () => {

    describe('labels', () => {
      it('warns if there is no label of any sort', () => {
        expectWarning(assertions.props.onClick.NO_LABEL.msg, () => {
          <div onClick={k}/>;
        });
      });

      it('does not warn if there is an aria-label', () => {
        doNotExpectWarning(assertions.props.onClick.NO_LABEL.msg, () => {
          <div aria-label="foo" onClick={k}/>;
        });
      });

      it('does not warn if there is an aria-labelled-by', () => {
        doNotExpectWarning(assertions.props.onClick.NO_LABEL.msg, () => {
          <div aria-labelled-by="foo" onClick={k}/>;
        });
      });

      it('does not warn if there are text node children', () => {
        doNotExpectWarning(assertions.props.onClick.NO_LABEL.msg, () => {
          <div onClick={k}>foo</div>;
        });
      });

      it('does not warn if there are deeply nested text node children', () => {
        doNotExpectWarning(assertions.props.onClick.NO_LABEL.msg, () => {
          <div onClick={k}><span><span>foo</span></span></div>;
        });
      });
    });

    describe('when role="button"', () => {
      it('requires onKeyUp', () => {
        expectWarning(assertions.props.onClick.BUTTON_ROLE_NO_KEYUP.msg, () => {
          <span onClick={k} role="button"/>;
        });
      });

      it('requires onKeyDown', () => {
        expectWarning(assertions.props.onClick.BUTTON_ROLE_NO_KEYDOWN.msg, () => {
          <span onClick={k} role="button"/>;
        });
      });
    });

    it('warns without role', () => {
      expectWarning(assertions.props.onClick.NO_ROLE.msg, () => {
        <div onClick={k}/>;
      });
    });

    it('does not warn with role', () => {
      doNotExpectWarning(assertions.props.onClick.NO_ROLE.msg, () => {
        <div onClick={k} role="button"/>;
      });
    });
  });

  describe('tabIndex', () => {
    describe('when element is not interactive', () => {
      it('warns without tabIndex', () => {
        expectWarning(assertions.props.onClick.NO_TABINDEX.msg, () => {
          <div onClick={k}/>;
        });
      });

      it('does not warn when tabIndex is present', () => {
        doNotExpectWarning(assertions.props.onClick.NO_TABINDEX.msg, () => {
          <div onClick={k} tabIndex="0"/>;
        });
      });
    });

    describe('when element is interactive', () => {
      it('does not warn about tabIndex with a[href]', () => {
        doNotExpectWarning(assertions.props.onClick.NO_TABINDEX.msg, () => {
          <a onClick={k} href="foo"/>;
        });
      });

      it('does not warn about buttons', () => {
        doNotExpectWarning(assertions.props.onClick.NO_TABINDEX.msg, () => {
          <button onClick={k}/>;
        });
      });
    });
  });
});

describe('tags', () => {
  describe('img', () => {
    it('requires alt attributes', () => {
      expectWarning(assertions.tags.img.MISSING_ALT.msg, () => {
        <img src="foo.jpg"/>;
      });
    });

    it('ignores proper alt attributes', () => {
      doNotExpectWarning(assertions.tags.img.MISSING_ALT.msg, () => {
        <img src="foo.jpg" alt="a foo, ofc"/>;
      });
    });

    it('dissallows the word "image" in the alt attribute', () => {
      expectWarning(assertions.tags.img.REDUDANT_ALT.msg, () => {
        <img src="cat.gif" alt="image of a cat"/>;
      });
    });
  });

  describe('a', () => {
    describe('with [href="#"]', () => {
      it('warns', () => {
        expectWarning(assertions.tags.a.HASH_HREF_NEEDS_BUTTON.msg, () => {
          <a onClick={k} href="#" />;
        });
      });
    });

    describe('with a real href', () => {
      it('does not warn', () => {
        doNotExpectWarning(assertions.tags.a.HASH_HREF_NEEDS_BUTTON.msg, () => {
          <a onClick={k} href="/foo/bar" />;
        });
      });
    });
  });
});

