var React = require('react');
var warning = require('react/lib/warning');
var assertions = require('./assertions');

var assertAccessibility = (tagName, props, children) => {
  var key;

  var tagTests = assertions.tags[tagName];
  if (tagTests)
    for (key in tagTests)
      warning(tagTests[key].test(tagName, props, children), tagTests[key].msg);

  var propTests;
  for (var propName in props) {
    propTests = assertions.props[propName];
    if (propTests)
      for (key in propTests)
        warning(propTests[key].test(tagName, props, children), propTests[key].msg);
  }
};

module.exports = () => {
  var _createElement = React.createElement;
  React.createElement = function (type, _props, ...children) {
    if (typeof type === 'string') {
      var props = _props || {};
      assertAccessibility(type, props, children);
    }
    return _createElement.apply(this, arguments);
  };
};

