var React = require('react');
var assertions = require('./assertions');

var assertAccessibility = (tagName, props, children, log) => {
  var key;

  var tagTests = assertions.tags[tagName];
  if (tagTests)
    for (key in tagTests)
      log(tagTests[key].test(tagName, props, children), tagTests[key].msg, props);

  var propTests;
  for (var propName in props) {
    propTests = assertions.props[propName];
    if (propTests)
      for (key in propTests)
        log(propTests[key].test(tagName, props, children), propTests[key].msg, props);
  }
};

var error = (passed, msg, props) => {
  if (!passed)
    throw new Error(msg + ' - props: ' + JSON.stringify(props));
};

var warn = (passed, msg, props) => {
  if (!passed)
    console.warn(msg + ' - props: ' + JSON.stringify(props));
};

module.exports = (options) => {
  var _createElement = React.createElement;
  var log = options && options.throw ? error : warn;
  React.createElement = function (type, _props, ...children) {
    if (typeof type === 'string') {
      var props = _props || {};
      assertAccessibility(type, props, children, log);
    }
    return _createElement.apply(this, arguments);
  };
};

