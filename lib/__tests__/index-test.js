var React = require('react');
var assert = require('assert');
var a11y = require('../index');
var assertions = require('../assertions');

var k = () => {};

var captureWarnings = (fn) => {
  var _warn = console.warn;
  var msgs = {};
  console.warn = (id, msg) => msgs[msg] = true;
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
  var createElement = React.createElement;

  before(() => {
    a11y(React);
  });

  after(() => {
    React.createElement = createElement;
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
});

describe('tags', () => {
  var createElement = React.createElement;

  before(() => {
    a11y(React);
  });

  after(() => {
    React.createElement = createElement;
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

    describe('with [tabIndex="0"] and no href', () => {
      it('warns', () => {
        expectWarning(assertions.tags.a.TABINDEX_NEEDS_BUTTON.msg, () => {
          <a onClick={k} tabIndex="0" />;
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

describe('labels', () => {
  var createElement = React.createElement;
  var fixture;

  before(() => {
    a11y(React);
  });

  after(() => {
    React.createElement = createElement;
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
      <button />;
    });
  });

  it('warns if there is no label on an element with an ARIA role', () => {
    expectWarning(assertions.render.NO_LABEL.msg, () => {
      <span role="button" />;
    });
  });

  it('does not warn if the element is not interactive', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <div />;
    });
  });

  it('does not warn if there is an aria-label', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <button aria-label="foo" />;
    });
  });

  it('does not warn if there is an aria-labelled-by', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <button aria-labelled-by="foo" />;
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

  it('does not warn if an anchor has no href', () => {
    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      <a/>;
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

  it('does not warn when the label text is inside a child component', (done) => {
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
      React.render(<div role="button"><span><Foo/></span></div>, fixture, done);
    });
  });

  it('does not warn when the label is an image with alt text inside a child component', (done) => {
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
      React.render(<div role="button"><span><Foo/></span></div>, fixture, done);
    });
  });

  it('warns when a child is a component with image content without alt', (done) => {
    var Foo = React.createClass({
      render: function() {
        return (
          <div className="foo">
            <span><span><img /></span></span>
          </div>
        );
      }
    });

    expectWarning(assertions.render.NO_LABEL.msg, () => {
      React.render(<div role="button"><span><Foo/></span></div>, fixture, done);
    });
  });

  it('does not warn when a child is a component with text and and an image without alt', (done) => {
    var Foo = React.createClass({
      render: function() {
        return (
          <div className="foo">
            <span><span>Foo <img /></span></span>
          </div>
        );
      }
    });

    doNotExpectWarning(assertions.render.NO_LABEL.msg, () => {
      React.render(<div role="button"><span><Foo/></span></div>, fixture, done);
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
      React.render(<div role="button"><Bar/></div>, fixture);
    });
  });

  it('does not warn as long as one child component has label text', (done) => {
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
      React.render(<div role="button"><Bar/><Foo/></div>, fixture, done);
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
      React.render(<div role="button"><Bar/><Foo/></div>, fixture);
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
      React.render(<div role="button"><Bar/></div>, fixture);
    });
  });

});

describe('filterFn', () => {
  var createElement = React.createElement;

  before(() => {
    var barOnly = (name, id, msg) => {
      return id === "bar";
    };

    a11y(React, { filterFn: barOnly });
  });

  after(() => {
    React.createElement = createElement;
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
  var createElement = React.createElement;

  before(() => {
    a11y(React, { device: ['mobile'] });
  });

  after(() => {
    React.createElement = createElement;
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