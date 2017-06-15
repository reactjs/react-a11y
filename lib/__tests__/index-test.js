var React = require('react');
var ReactDOM = require('react-dom');
var assert = require('assert');
var a11y = require('../index');
var assertions = require('../assertions');
var _after = require('../after');

var k = () => {};

var captureWarnings = (fn) => {
  var _warn = console.warn;
  var msgs = {};
  console.warn = (id, msg, srcNode) => {
    msgs[msg] = srcNode ? srcNode : true;
  };
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

describe('a11y', () => {
  describe('#restoreAll', () => {
    let restorePatchedMethods;
    let createElement;

    beforeEach(() => {
      restorePatchedMethods = _after.restorePatchedMethods;
      createElement = React.createElement;
    });

    afterEach(() => {
      _after.restorePatchedMethods = restorePatchedMethods;
      React.createElement = createElement;
    });

    it('restores React.createElement', () => {
      a11y(React);
      assert(createElement !== React.createElement);
      a11y.restoreAll();
      assert(createElement === React.createElement);
    });

    it('calls after.restorePatchedMethods()', () => {
      let called = false;
      _after.restorePatchedMethods = () => called = true;
      a11y.restoreAll();
      assert(called);
    });
  });
});

describe('props', () => {
  before(() => {
    a11y(React, { ReactDOM });
  });

  after(() => {
    a11y.restoreAll();
  });

  describe('onClick', () => {
    describe('when role="button"', () => {
      it('requires onKeyDown', () => {
        expectWarning(assertions.props.onClick.BUTTON_ROLE_SPACE.msg, () => {
          <span onClick={k} role="button"/>;
        });
      });

      it('requires onKeyDown', () => {
        expectWarning(assertions.props.onClick.BUTTON_ROLE_ENTER.msg, () => {
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

    it('does not warn with no role and `aria-hidden="true"`', () => {
      doNotExpectWarning(assertions.props.onClick.NO_ROLE.msg, () => {
        <a aria-hidden="true" onClick={k}/>;
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

      it('does not warn when tabIndex is present', () => {
        doNotExpectWarning(assertions.props.onClick.NO_TABINDEX.msg, () => {
          <div onClick={k} tabIndex={0}/>;
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

  describe('aria-hidden', () => {
    describe('when set to `true`', () => {
      it('warns when applied to an interactive element without `tabIndex="-1"`', () => {
        expectWarning(assertions.props['aria-hidden'].TABINDEX_REQUIRED_WHEN_ARIA_HIDDEN.msg, () => {
          <a aria-hidden="true" href="/foo"/>;
        });
      });

      it('warns when applied to an interactive element with `tabIndex="0"`', () => {
        expectWarning(assertions.props['aria-hidden'].TABINDEX_REQUIRED_WHEN_ARIA_HIDDEN.msg, () => {
          <a aria-hidden="true" tabIndex="0"/>;
        });
      });

      it('does not warn when applied to a placeholder link', () => {
        expectWarning(assertions.props['aria-hidden'].TABINDEX_REQUIRED_WHEN_ARIA_HIDDEN.msg, () => {
          <a aria-hidden="true"/>;
        });
      });

      it('does not warn when applied to an interactive element with `tabIndex="-1"`', () => {
        doNotExpectWarning(assertions.props['aria-hidden'].TABINDEX_REQUIRED_WHEN_ARIA_HIDDEN.msg, () => {
          <a aria-hidden="true" tabIndex="-1"/>;
        });
      });

      it('does not warn when applied to a non-interactive element', () => {
        doNotExpectWarning(assertions.props['aria-hidden'].TABINDEX_REQUIRED_WHEN_ARIA_HIDDEN.msg, () => {
          <div aria-hidden="true"/>;
        });
      });
    });

    describe('when set to `false`', () =>{
      it('does not warn when applied to an interactive element with `tabIndex="-1"`', () => {
        doNotExpectWarning(assertions.props['aria-hidden'].TABINDEX_REQUIRED_WHEN_ARIA_HIDDEN.msg, () => {
          <a aria-hidden="false" tabIndex="-1"/>;
        });
      });
    });
  });
});

describe('tags', () => {
  before(() => {
    a11y(React, { ReactDOM });
  });

  after(() => {
    a11y.restoreAll();
  });

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
      expectWarning(assertions.tags.img.REDUNDANT_ALT.msg, () => {
        <img src="cat.gif" alt="image of a cat"/>;
      });
    });

    it('dissallows the word "picture" in the alt attribute', () => {
      expectWarning(assertions.tags.img.REDUNDANT_ALT.msg, () => {
        <img src="cat.gif" alt="picture of a cat"/>;
      });
    });
  });

  describe('a', () => {
    describe('placeholder links without href', () => {
      it('does not warn', () => {
        doNotExpectWarning(assertions.tags.a.HASH_HREF_NEEDS_BUTTON.msg, () => {
          <a class="foo"/>;
        });
      });
    });

    describe('placeholder links without tabindex', () => {
      it('does not warn', () => {
        doNotExpectWarning(assertions.tags.a.TABINDEX_NEEDS_BUTTON.msg, () => {
          <a class="foo"/>;
        });
      });
    });

    describe('with [href="#"]', () => {
      it('warns', () => {
        expectWarning(assertions.tags.a.HASH_HREF_NEEDS_BUTTON.msg, () => {
          <a onClick={k} href="#"/>;
        });
      });
    });

    describe('with [tabIndex="0"] and no href', () => {
      it('warns', () => {
        expectWarning(assertions.tags.a.TABINDEX_NEEDS_BUTTON.msg, () => {
          <a onClick={k} tabIndex="0"/>;
        });
      });
    });

    describe('with a real href', () => {
      it('does not warn', () => {
        doNotExpectWarning(assertions.tags.a.HASH_HREF_NEEDS_BUTTON.msg, () => {
          <a onClick={k} href="/foo/bar"/>;
        });
      });
    });
  });
});

describe('labels', () => {
  var fixture;

  before(() => {
    a11y(React, { ReactDOM });
  });

  after(() => {
    a11y.restoreAll();
  });

  beforeEach(() => {
    fixture = document.createElement('div');
    fixture.id = 'fixture-1';
    document.body.appendChild(fixture);
  });

  afterEach(() => {
    fixture = document.getElementById('fixture-1');
    if (fixture)
      document.body.removeChild(fixture);
  });

  it('warns if there is no label on an interactive element', () => {
    expectWarning(assertions.render.NO_LABEL.msg, () => {
      <button/>;
    });
  });

  it('warns if there is no label on a placeholder link', () => {
    expectWarning(assertions.render.NO_LABEL.msg, () => {
      <a/>;
    });
  });

  it('does not warn when a placeholder link has a label', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <a>foo</a>;
    });
  });

  it('warns if there is no label on an element with an ARIA role', () => {
    expectWarning(assertions.render.NO_LABEL.msg, () => {
      <span role="button"/>;
    });
  });

  it('does not warn when `role="presentation"`', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <img role="presentation"/>;
    });
  });

  it('does not warn when `role="none"`', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <img role="none"/>;
    });
  });

  it('does not warn when `aria-hidden="true"`', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <button aria-hidden="true"/>;
    });
  });

  it('warns when `aria-hidden="false"`', () => {
    expectWarning(assertions.render.NO_LABEL.msg, () => {
      <button aria-hidden="false"/>;
    });
  });

  it('does not warn if the element is not interactive', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <div/>;
    });
  });

  it('does not warn if there is an aria-label', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <button aria-label="foo"/>;
    });
  });

  it('does not warn if there is an aria-labelledby', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <button aria-labelledby="foo"/>;
    });
  });

  it('does not warn if there are text node children', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <button>foo</button>;
    });
  });

  it('does not warn if there are deeply nested text node children', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <button><span><span>foo</span></span></button>;
    });
  });

  it('does not error if there are undefined children', () => {
    var undefChild;
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <button>{ undefChild } bar</button>;
    });
  });

  it('does not error if there are null children', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <button>bar { null }</button>;
    });
  });

  it('does not warn if there is an image with an alt attribute', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <button><img src="#" alt="Foo"/></button>;
    });
  });

  it('warns if an image without alt is the only content', () => {
    expectWarning(assertions.render.NO_LABEL.msg, () => {
      <button><img src="#" alt=""/></button>;
    });
  });

  it('does not warn if an image without alt is accompanied by text', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <button>foo <img src="#" alt=""/></button>;
    });
  });

  it('does not warn if a hidden input', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <input type="hidden"/>;
    });
  });

  it('warns if a visible input', () => {
    expectWarning(assertions.render.NO_LABEL.msg, () => {
      <input type="text"/>;
    });
  });
  
  it('does not warn for submit inputs with a value', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <input type="submit" value="the name" />;
    });
  });

  it('warns for submit inputs without a value', () => {
    expectWarning(assertions.render.NO_LABEL.msg, () => {
      <input type="submit" />;
    });
  });

  it('warns if an anchor has a tabIndex but no href', () => {
    expectWarning(assertions.render.NO_LABEL.msg, () => {
      <a tabIndex="0"/>;
    });
  });

  it('warns if an anchor has an href', () => {
    expectWarning(assertions.render.NO_LABEL.msg, () => {
      <a href="/foo"/>;
    });
  });

  it('does not warn when the label text is inside a child component', () => {
    var Foo = React.createClass({
      render: function() {
        return (
          <div className="foo">
            <span><span>foo</span></span>
          </div>
        );
      }
    });

    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      ReactDOM.render(<div role="button"><span><Foo/></span></div>, fixture);
    });
  });

  it('does not warn when the label is an image with alt text', () => {
    var Foo = React.createClass({
      render: function() {
        return (
          <img alt="foo"/>
        );
      }
    });

    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      ReactDOM.render(<div role="button"><Foo/></div>, fixture);
    });
  });

  it('warns when the label is an image without alt text', () => {
    var Foo = React.createClass({
      render: function() {
        return (
          <img alt=""/>
        );
      }
    });

    expectWarning(assertions.render.NO_LABEL.msg, () => {
      ReactDOM.render(<div role="button"><Foo/></div>, fixture);
    });
  });

  it('does not warn when the label is an image with alt text nested inside a child component', () => {
    var Foo = React.createClass({
      render: function() {
        return (
          <div className="foo">
            <span><span><img alt="foo"/></span></span>
          </div>
        );
      }
    });

    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      ReactDOM.render(<div role="button"><span><Foo/></span></div>, fixture);
    });
  });

  it('warns when an image without alt text is nested inside a child component', () => {
    var Foo = React.createClass({
      render: function() {
        return (
          <div className="foo">
            <span><span><img/></span></span>
          </div>
        );
      }
    });

    expectWarning(assertions.render.NO_LABEL.msg, () => {
      ReactDOM.render(<div role="button"><span><Foo/></span></div>, fixture);
    });
  });

  it('does not warn when there is an image without alt text with a sibling text node', () => {
    var Foo = React.createClass({
      render: function() {
        return (
          <div className="foo">
            <span><span>Foo <img/></span></span>
          </div>
        );
      }
    });

    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      ReactDOM.render(<div role="button"><span><Foo/></span></div>, fixture);
    });
  });

  it('warns when a child is a component without text content', () => {
    var Bar = React.createClass({
      render: () => {
        return (
          <div className="bar"></div>
        );
      }
    });

    expectWarning(assertions.render.NO_LABEL.msg, () => {
      ReactDOM.render(<div role="button"><Bar/></div>, fixture);
    });
  });

  it('does not warn as long as one child component has label text', () => {
    var Bar = React.createClass({
      render: () => {
        return (
          <div className="bar"></div>
        );
      }
    });

    var Foo = React.createClass({
      render: function() {
        return (
          <div className="foo">
            <span><span>foo</span></span>
          </div>
        );
      }
    });

    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      ReactDOM.render(<div role="button"><Bar/><Foo/></div>, fixture);
    });
  });

  it('warns if no child components have label text', () => {
    var Bar = React.createClass({
      render: () => {
        return (
          <div className="bar"></div>
        );
      }
    });

    var Foo = React.createClass({
      render: function() {
        return (
          <div className="foo"></div>
        );
      }
    });

    expectWarning(assertions.render.NO_LABEL.msg, () => {
      ReactDOM.render(<div role="button"><Bar/><div/><Foo/></div>, fixture);
    });
  });

  it('does not error when the component has a componentDidMount callback', () => {
    var Bar = React.createClass({
      _privateProp: 'bar',

      componentDidMount: function() {
        return this._privateProp;
      },
      render: () => {
        return (
          <div className="bar"></div>
        );
      }
    });

    expectWarning(assertions.render.NO_LABEL.msg, () => {
      ReactDOM.render(<div role="button"><Bar/></div>, fixture);
    });
  });

  it('does not warn when the label is a number', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <a>{1111}</a>;
    });
  });
});

describe('includeSrcNode is "asString"', () => {
  var fixture;

  before(() => {
    a11y(React, { includeSrcNode: "asString" });
    fixture = document.createElement('div');
    fixture.id = 'fixture-1';
    document.body.appendChild(fixture);
  });

  after(() => {
    a11y.restoreAll();
    fixture = document.getElementById('fixture-1');
    if (fixture)
      document.body.removeChild(fixture);
  });

  it('returns the outerHTML as a string in the error message', () => {
    var Bar = React.createClass({
      _privateProp: 'bar',

      componentDidMount: function() {
        return this._privateProp;
      },
      render: () => {
        return (
          <div role="button"></div>
        );
      }
    });

    var msgs = captureWarnings(() => {ReactDOM.render(<Bar/>, fixture);});
    var regex = /^Source Node: <(\w+) .+>.*<\/\1>/;
    var matches = msgs[assertions.render.NO_LABEL.msg].match(regex);
    assert.equal(matches[1], "div");
  });
});

describe('filterFn', () => {
  before(() => {
    var barOnly = (name, id, msg) => {
      return id === "bar";
    };

    a11y(React, { filterFn: barOnly });
  });

  after(() => {
    a11y.restoreAll();
  });

  describe('when the source element has been filtered out', () => {
    it('does not warn', () => {
      doNotExpectWarning(assertions.tags.img.MISSING_ALT.msg, () => {
        <img id="foo" src="foo.jpg"/>;
      });
    });
  });

  describe('when there are filtered results', () => {
    it('warns', () => {
      expectWarning(assertions.tags.img.MISSING_ALT.msg, () => {
        <div>
          <img id="foo" src="foo.jpg"/>
          <img id="bar" src="foo.jpg"/>
        </div>;
      });
    });
  });
});

describe('device is set to mobile', () => {
  before(() => {
    a11y(React, { device: ['mobile'] });
  });

  after(() => {
    a11y.restoreAll();
  });

  describe('when role="button"', () => {
    it('does not require onKeyDown', () => {
      doNotExpectWarning(assertions.props.onClick.BUTTON_ROLE_SPACE.msg, () => {
        <span onClick={k} role="button"/>;
      });
    });

    it('does not require onKeyDown', () => {
      doNotExpectWarning(assertions.props.onClick.BUTTON_ROLE_ENTER.msg, () => {
        <span onClick={k} role="button"/>;
      });
    });
  });
});

describe('exclusions', () => {
  before(() => {
    a11y(React, { exclude: ['REDUNDANT_ALT'] });
  });

  after(() => {
    a11y.restoreAll();
  });

  describe('when REDUNDANT_ALT is excluded', () => {
    it('does not warn when the word "image" in the alt attribute', () => {
      doNotExpectWarning(assertions.tags.img.REDUNDANT_ALT.msg, () => {
        <img src="cat.gif" alt="image of a cat"/>;
      });
    });
  });
});

describe('warningPrefix', () => {
  let warningPrefix = 'react-a11y ERROR:';
  before(() => {
    a11y(React, { warningPrefix });
  });

  after(() => {
    a11y.restoreAll();
  });

  it('adds the prefix to each warning message', () => {
    expectWarning(warningPrefix + assertions.tags.img.MISSING_ALT.msg, () => {
      <div>
        <img id="foo" src="foo.jpg"/>
        <img id="bar" src="foo.jpg"/>
      </div>;
    });
  });
});

describe('testing children', () => {
  before(() => {
    a11y(React, { exclude: ['REDUNDANT_ALT'] });
  });

  after(() => {
    a11y.restoreAll();
  });

  describe('when children is passed down in props', () => {
    it('calls each test with the children', () => {
      doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
        React.createElement('a', {href: 'google.com', children: 'Google'});
      });
    });
  });

  describe('when children is passed down separately from props', () => {
    it('calls each test with the children', () => {
      doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
        React.createElement('a', {href: 'google.com'}, 'Google');
      });
    });
  });
});
