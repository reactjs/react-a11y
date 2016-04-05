import assertions from './assertions'
import after      from './after'

const shouldRunTest = function (testName, options = {} ) {
  let {
    exclude = []
  , device
  } = options

  if ( device == 'mobile' ) {
    exclude = exclude.concat(assertions.mobileExclusions)
  }

  return exclude.indexOf(testName) === -1
}

const runTagTests = function (tagName, props, children, options, onFailure) {
  const tagTests = assertions.tags[tagName] || []

  Object.keys(tagTests).forEach(function (key) {
    const testFailed = shouldRunTest(key, options) &&
      !tagTests[key].test(tagName, props, children)

    if (tagTests[key] && testFailed) {
      onFailure(tagName, props, tagTests[key].msg)
    }
  })
}

const runPropTests = function (tagName, props, children, options, onFailure) {
  Object.keys(props).forEach(function (propName) {
    if ( props[propName] !== null || props[propName] !== undefined ) {
      const propTests = assertions.props[propName] || [];
      Object.keys(propTests).forEach(function (key) {
        const testTailed = shouldRunTest(key, options) &&
          !propTests[key].test(tagName, props, children)

        if (propTests[key] && testTailed) {
          onFailure(tagName, props, propTests[key].msg)
        }
      })
    }
  })
}

var runLabelTests = function (tagName, props, children, options, onFailure) {
  const renderTests = assertions.render

  Object.keys(renderTests).forEach(function (key) {
    if (shouldRunTest(key, options) && renderTests[key]) {
      const failureCB = onFailure
        .bind(undefined, tagName, props, renderTests[key].msg)

      renderTests[key].test(tagName, props, children, failureCB)
    }
  })
}

// run all tests
const allTests = [runTagTests, runPropTests, runLabelTests]
const runTests = function (tagName, props, children, options, onFailure) {
  allTests.forEach(function (test) {
    test(tagName, props, children, options, onFailure)
  })
}

const shouldShowError = function (failureInfo, options = {}) {
  if (typeof options.filterFn === 'function') {
    return options.filterFn(failureInfo.tagName, failureInfo.id)
  } else {
    return true
  }
}

const throwError = function (failureInfo, options = {}) {
  if (!shouldShowError(failureInfo, options)) {
    return
  }

  const error = [failureInfo.tagName, failureInfo.msg]

  if (options.includeSrcNode) {
    error.push(failureInfo.id)
  }

  throw new Error(error.join(' '))
}

const logAfterRender = function (component, log) {
  after(component, 'componentDidMount', log)
  after(component, 'componentDidUpdate', log)
}

const logWarning = function (component, failureInfo, options = {}) {
  const {
    includeSrcNode = false
  } = options

  const warn = function () {
    if (!shouldShowError(failureInfo, options)) {
      return
    }

    const warning = [failureInfo.tagName, failureInfo.msg];

    if (includeSrcNode && component) {
      // TODO:
      // 1) Consider using ReactDOM.findDOMNode() over document.getElementById
      //    https://github.com/reactjs/react-a11y/issues/54
      // 2) Consider using ref to expand element element reference logging
      //    to all element (https://github.com/reactjs/react-a11y/issues/55)
      let srcNode = document.getElementById(failureInfo.id);

      // Guard against logging null element references should render()
      // return null or false.
      // https://facebook.github.io/react/docs/component-api.html#getdomnode
      if (includeSrcNode === "asString") {
        warning.push("Source Node: " + srcNode.outerHTML)
      } else if (srcNode) {
        warning.push(srcNode)
      }
    }
    console.warn.apply(console, warning);
  }

  if (includeSrcNode && component) {
    // Cannot log a node reference until the component is in the DOM,
    // so defer the document.getElementById call until componentDidMount
    // or componentDidUpdate.
    logAfterRender(component._instance, warn)
  } else {
    warn()
  }
}

const handleFailure = function (options = {}, reactEl, type, props, failureMsg) {
  const {
    includeSrcNode = false
  , warningPrefix  = ''
  , filterFn
  , throw: doThrow
  } = options

  // get the owning component
  const reactComponent = reactEl._owner

  // if a component instance, use the component's name,
  // if a ReactElement instance, use the tag name + id (e.g. div#foo)
  const name = reactComponent && reactComponent.getName() || type

  const failureInfo = {
    tagName: name
  , msg: warningPrefix + failureMsg
  }

  const notifyOpts = {
    includeSrcNode
  , filterFn
  }

  if ( doThrow ) {
    throwError(failureInfo, notifyOpts)
  } else {
    logWarning(reactComponent, failureInfo, notifyOpts)
  }
}

let nextId = 0
const createId = function(props) {
  return (props.id || 'a11y-' + nextId++)
}


let _React
let _createElement

const reactA11y = function (React, options = {}) {
  const {
    includeSrcNode
  , ReactDOM
  } = options

  if (!React && !React.createElement) {
    throw new Error('Missing parameter: React')
  }

  // save our copy to react
  _React         = React
  _createElement = React.createElement
  assertions.setReact(React, ReactDOM)

  // replace createElement with our overloaded version
  _React.createElement = function (type, props = {}, ...children) {

    const newProps  = Object.assign(props, includeSrcNode ? {id: createId(props)} : {})
    const reactEl   = _createElement.apply(this, [type, newProps].concat(children))
    const failureCB = handleFailure.bind(undefined, options, reactEl)

    if (typeof type === 'string') {
      // only test html elements
      const childrenForTest = children.length === 0
        ? props.children || []
        : children

      runTests(type, newProps, childrenForTest, options, failureCB)
    }

    return reactEl
  }
}

reactA11y.restoreAll = function() {
  _React.createElement = _createElement
  after.restorePatchedMethods()
}

export default reactA11y
