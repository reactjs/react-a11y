var React = require('react');
var assertions = require('./assertions');

var assertAccessibility = (tagName, props, children, log) => {
  var key;

  var tagTests = assertions.tags[tagName];
  if (tagTests)
    for (key in tagTests)
      log(tagTests[key].test(tagName, props, children), tagTests[key].msg);

  var propTests;
  for (var propName in props) {
    propTests = assertions.props[propName];
    if (propTests)
      for (key in propTests)
        log(propTests[key].test(tagName, props, children), propTests[key].msg);
  }
};

var error = (passed, msg) => {
  if (!passed)
    throw new Error(msg);
};

var warn = (passed, msg) => {
  if (!passed)
    console.warn(msg);
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

