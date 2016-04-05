import after      from './after'
import assertions from './assertions'
import runTests   from './tests'
import ReactDOM   from 'react-dom'

// check if an error is allowed
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


const logWarning = function (component, failureInfo, options = {}) {
  // omit warning if we don't need to show it
  if (!shouldShowError(failureInfo, options)) {
    return
  }

  const {
    includeSrcNode = false
  } = options

  const {
    tagName
  , msg
  , ref
  } = failureInfo

  const warning = [tagName, msg]

  if (includeSrcNode && component) {
    const instance = component._instance
    // Cannot log a node reference until the component is in the DOM,
    // so defer the call until componentDidMount or componentDidUpdate.
    after.render(instance, function () {
      const srcNode = ReactDOM.findDOMNode(instance.refs[ref])

      if (includeSrcNode === "asString") {
        console.warn(...warning, `Source Node: ${srcNode.outerHTML}`)
      } else if (srcNode) {
        console.warn(...warning, srcNode)
      }
    })
  } else {
    console.warn(...warning)
  }
}

const failureHandler = (options = {}, reactEl) => function (type, props, failureMsg) {
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
  const tagName = reactComponent && reactComponent.getName() || type

  const failureInfo = {
    tagName
  , ref: props.ref
  , msg: warningPrefix.concat(failureMsg)
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

let nextRef = 0
const createRef = function (props) {
  return (props.ref || 'a11y-' + nextRef++)
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
  // _ReactDOM      = ReactDOM
  assertions.setReact(React, ReactDOM)

  // replace createElement with our overloaded version
  _React.createElement = function (type, props = {}, ...children) {

    const ref       = createRef(props)
    const newProps  = typeof type === 'string' ? { ...props, ref } : props

    const reactEl   = _createElement(type, newProps, ...children)
    const handler   = failureHandler(options, reactEl)

    // only test html elements
    if (typeof type === 'string') {
      const childrenForTest = children.length === 0
        ? props.children || []
        : children

      runTests(type, newProps, childrenForTest, options, handler)
    }

    return reactEl
  }
}

reactA11y.restoreAll = function() {
  _React.createElement = _createElement
  after.restorePatchedMethods()
}

export default reactA11y
