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
    if (props[propName] === null || props[propName] === undefined) continue;
    propTests = assertions.props[propName];
    if (propTests)
      for (key in propTests)
        log(propTests[key].test(tagName, props, children), propTests[key].msg);
  }
};

var error = (passed, msg, options) => {
  if (!passed)
    throw new Error(msg);
};

var warn = (passed, msg, options) => {
  if (!passed) {
    console.warn(msg);

    if (options.showTrace) {
      console.trace();
    }
  }
};

var getLogger = (options) => {
  var log = options && options.throw ? error : warn;

  return (passed, msg) => {
    log(passed, msg, options);
  };
}

module.exports = (options) => {
  var _createElement = React.createElement;
  var log = getLogger(options);
  React.createElement = function (type, _props, ...children) {
    if (typeof type === 'string') {
      var props = _props || {};
      assertAccessibility(type, props, children, log);
    }
    return _createElement.apply(this, arguments);
  };
};
