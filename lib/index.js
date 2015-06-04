var assertions = require('./assertions');
var after = require('./after');

var deviceMatches = (test, deviceFilter) => {
  if (!test.device)
    return true;

  return (deviceFilter.indexOf(test.device) != -1);
};

var runTagTests = (tagName, props, children, deviceFilter, onFailure) => {
  var key;
  var tagTests = assertions.tags[tagName] || [];

  for (key in tagTests) {
    let shouldRunTest = deviceMatches(tagTests[key], deviceFilter);
    let testFailed = shouldRunTest &&
      !tagTests[key].test(tagName, props, children);

    if (tagTests[key] && testFailed)
      onFailure(tagName, props, children, tagTests[key].msg);
   }
};

var runPropTests = (tagName, props, children, deviceFilter, onFailure) => {
  var key;
  var propTests;

  for (var propName in props) {
    if (props[propName] === null || props[propName] === undefined) continue;

    propTests = assertions.props[propName] || [];

    for (key in propTests) {
      let shouldRunTest = deviceMatches(propTests[key], deviceFilter);
      let testTailed = shouldRunTest &&
        !propTests[key].test(tagName, props, children);

      if (propTests[key] && testTailed)
        onFailure(tagName, props, children, propTests[key].msg);
    }
  }
};

var runLabelTests = (tagName, props, children, deviceFilter, onFailure) => {
  var key;
  var renderTests = assertions.render;

  for (key in renderTests) {
    if (renderTests[key]) {
      let failureCB = onFailure.bind(
        undefined, tagName, props, children, renderTests[key].msg);

      renderTests[key].test(tagName, props, children, failureCB);
    }
  }
};

var runTests = (tagName, props, children, deviceFilter, onFailure) => {
  var tests = [runTagTests, runPropTests, runLabelTests];
  tests.map((test) => {
    test(tagName, props, children, deviceFilter, onFailure);
  });
};

var shouldShowError = (failureInfo, options) => {
  var filterFn = options.filterFn;
  if (filterFn)
    return filterFn(failureInfo.name, failureInfo.id);

  return true;
};

var throwError = (failureInfo, options) => {
  if (!shouldShowError(failureInfo, options))
    return;

  var error = [failureInfo.name, failureInfo.failure];

  if (options.includeSrcNode)
    error.push(failureInfo.id);

  throw new Error(error.join(' '));
};

var logAfterRender = (component, log) => {
  after(component, 'componentDidMount', log);
  after(component, 'componentDidUpdate', log);
};

var logWarning = (component, failureInfo, options) => {
  var includeSrcNode = options.includeSrcNode;

  var warn = () => {
    if (!shouldShowError(failureInfo, options))
      return;

    var warning = [failureInfo.name, failureInfo.failure];

    if (includeSrcNode)
      warning.push(document.getElementById(failureInfo.id));

    console.warn.apply(console, warning);
  };

  if (component && includeSrcNode) {
    // Cannot log a node reference until the component is in the DOM,
    // so defer the document.getElementById call until componentDidMount
    // or componentDidUpdate.
    logAfterRender(component._instance, warn);
  } else {
    warn();
  }
};

var handleFailure = (options, reactEl, type, props, children, failure) => {
  var includeSrcNode = options && !!options.includeSrcNode;
  var reactComponent = reactEl._owner;

  // If a Component instance, use the component's name,
  // if a ReactElement instance, use the tag name + id (e.g. div#foo)
  var name = reactComponent && reactComponent.getName() ||
    type + '#' + props.id;

  var failureInfo = {
    'name': name ,
    'id': props.id,
    'failure': failure
  };

  var notifyOpts = {
    'includeSrcNode': includeSrcNode,
    'filterFn': options && options.filterFn
  };

  if (options && options.throw)
    throwError(failureInfo, notifyOpts);
  else
    logWarning(reactComponent, failureInfo, notifyOpts);
};


var _createElement;

var createId = function() {
  var nextId = 0;
  return (props) => {
    return (props.id || 'a11y-' + nextId++);
  };
}();

var reactA11y = (React, options) => {
  if (!React && !React.createElement) {
    throw new Error('Missing parameter: React');
  }

  assertions.setReact(React);

  _createElement = React.createElement;
  var deviceFilter = options && options.device || ['desktop'];

  React.createElement = (type, _props, ...children) => {
    var props = _props || {};

    props.id = createId(props);
    var reactEl = _createElement.apply(this, [type, props].concat(children));
    var failureCB = handleFailure.bind(undefined, options, reactEl);

    if (typeof type === 'string')
      runTests(type, props, children, deviceFilter, failureCB);

    return reactEl;
  };
};

module.exports = reactA11y;
