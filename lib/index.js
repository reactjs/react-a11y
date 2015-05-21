var assertions = require('./assertions');

var deviceMatches = (test, deviceFilter) => {
  if (!test.device) {
    return true;
  }

  return (deviceFilter.indexOf(test.device) != -1);
};

var assertAccessibility = (tagName, props, children, deviceFilter) => {
  var key;
  var failures = [];
  var tagTests = assertions.tags[tagName] || [];
  for (key in tagTests)
    if (tagTests[key] && deviceMatches(tagTests[key], deviceFilter) && !tagTests[key].test(tagName, props, children))
      failures.push(tagTests[key].msg);

  var propTests;
  for (var propName in props) {
    if (props[propName] === null || props[propName] === undefined) continue;
    propTests = assertions.props[propName] || [];
    for (key in propTests)
      if (propTests[key] && deviceMatches(propTests[key], deviceFilter) && !propTests[key].test(tagName, props, children))
        failures.push(propTests[key].msg);
  }
  return failures;
};

var filterFailures = (failureInfo, options) => {
  var failures = failureInfo.failures;
  var filterFn = options.filterFn &&
        options.filterFn.bind(undefined, failureInfo.name, failureInfo.id);

  if (filterFn) {
    failures = failures.filter(filterFn);
  }

  return failures;
};

var throwError = (failureInfo, options) => {
  var failures = filterFailures(failureInfo, options);
  var msg = failures.pop();
  var error = [failureInfo.name, msg];

  if (options.includeSrcNode) {
    error.push(failureInfo.id);
  }

  throw new Error(error.join(' '));
};

var after = (host, name, cb) => {
  var originalFn = host[name];

  if (originalFn) {
    host[name] = () => {
      originalFn.call(host);
      cb.call(host);
    };
  } else {
    host[name] = cb;
  }
};

var logAfterRender = (component, log) => {
  after(component, 'componentDidMount', log);
  after(component, 'componentDidUpdate', log);
};

var logWarning = (component, failureInfo, options) => {
  var includeSrcNode = options.includeSrcNode;

  var warn = () => {
    var failures = filterFailures(failureInfo, options);

    failures.forEach((failure) => {
      var msg = failure;
      var warning = [failureInfo.name, msg];

      if (includeSrcNode) {
        warning.push(document.getElementById(failureInfo.id));
      }

      console.warn.apply(console, warning);
    });

    totalFailures.push(failureInfo);
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

var nextId = 0;
var totalFailures;

var reactA11y = (React, options) => {
  if (!React && !React.createElement) {
    throw new Error('Missing parameter: React');
  }
  assertions.setReact(React);

  totalFailures = [];
  var _createElement = React.createElement;
  var includeSrcNode = options && !!options.includeSrcNode;
  var deviceFilter = options && options.device || ['desktop'];

  React.createElement = (type, _props, ...children) => {
    var props = _props || {};
    var reactEl;

    if (typeof type === 'string') {
      let failures = assertAccessibility(type, props, children, deviceFilter);
      if (failures.length) {
        // Generate an id if one doesn't exist
        props.id = (props.id || 'a11y-' + nextId++);
        reactEl = _createElement.apply(this, [type, props].concat(children));

        let reactComponent = reactEl._owner;

        // If a Component instance, use the component's name,
        // if a ReactElement instance, use the node DOM + id (e.g. div#foo)
        let name = reactComponent && reactComponent.getName() ||
          reactEl.type + '#' + props.id;

        let failureInfo = {
          'name': name ,
          'id': props.id,
          'failures': failures
        };

        let notifyOpts = {
          'includeSrcNode': includeSrcNode,
          'filterFn': options && options.filterFn
        };

        if (options && options.throw) {
          throwError(failureInfo, notifyOpts);
        } else {
          logWarning(reactComponent, failureInfo, notifyOpts);
        }

      } else {
        reactEl = _createElement.apply(this, [type, props].concat(children));
      }
    } else {
      reactEl = _createElement.apply(this, [type, props].concat(children));
    }

    return reactEl;
  };

  reactA11y.getFailures = () => {
    return totalFailures;
  };

};

module.exports = reactA11y;
