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

var error = (passed, msg, props, options) => {
  var errMsg = options && options.showProps ? msg + " - Element's props:" + JSON.stringify(props) : msg;
  if (!passed)
    throw new Error(errMsg);
};

var warn = (passed, msg, props, options) => {
  var warnMsg = options && options.showProps ? msg + " - Element's props:" + JSON.stringify(props) : msg;
  if (!passed)
    console.warn(warnMsg);
};

// borrowed from https://github.com/rackt/react-a11y/pull/9/files#diff-6d186b954a58d5bb740f73d84fe39073R36
var getLogger = (options) => {
  var log = options && options.throw ? error : warn;

  return (passed, msg, props) => {
    log(passed, msg, props, options);
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

