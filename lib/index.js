import after      from './after'
import assertions from './assertions'
import runTests   from './tests'

let _React
let _createElement
let _ReactDOM

// always resolve to true
const always = () => true

// throw error with string representation
// of node
const throwError = function (...args) {
  const last = args[args.length - 1]
  if ( last.outerHTML ) {
    args[args.length - 1] = 'Element: \n  ' + last.outerHTML
  }

  const error = new Error(args.join(' '))
  error.element = last

  throw error
}

// just show the warning
const showWarning = function (...args) {
  console.warn(...args)
}

// renders the failure message based on options and component lifycycle
const displayFailure = function (component, failureInfo, options = {}, done) {
  const {
    includeSrcNode = false
  } = options

  const {
    tagName
  , msg
  , refs
  } = failureInfo

  if (includeSrcNode && component) {
    const instance = component._instance
    // Cannot log a node reference until the component is in the DOM,
    // so defer the call until componentDidMount or componentDidUpdate.
    after.render(instance, function () {
      // unpack the ref
      const srcNode = refs.node

      if (includeSrcNode === "asString") {
        return done(tagName, msg, `Source Node: ${srcNode.outerHTML}`)
      } else if (srcNode) {
        return done(tagName, msg, srcNode)
      }
    })
  } else {
    return done(tagName, msg)
  }
}

const failureHandler = (options = {}, reactEl, refs) => function (type, props, failureMsg) {
  const {
    includeSrcNode = false
  , throw: doThrow = false
  , warningPrefix  = ''
  , filterFn       = always
  } = options

  // get the owning component
  const owner = reactEl._owner

  // if a component instance, use the component's name,
  // if a ReactElement instance, use the tag name + id (e.g. div#foo)
  const tagName = owner && owner.getName() || type

  const failureInfo = {
    tagName
  , msg: warningPrefix.concat(failureMsg)
  , refs
  }

  const opts = {
    includeSrcNode
  }

  // display the failure if it isn't filtered
  if ( filterFn(failureInfo, props.id, failureInfo.msg) ) {
    // how should we handle the message?
    const done = doThrow ? throwError : showWarning
    displayFailure(owner, failureInfo, opts, done)
  }
}

let nextRef = 0
const createRef = function (props = {}) {
  return (props || {}).ref || `a11y-${nextRef++}`
}

const reactA11y = function (React, options = {}) {
  const {
    includeSrcNode
  , ReactDOM
  } = options

  if (!React && !React.createElement) {
    throw new Error('Missing parameter: React')
  }

  if (includeSrcNode && !ReactDOM) {
    throw new Error('I need ReactDOM option when includeSrcNode is true')
  }

  // save our copy to react
  _React         = React
  _ReactDOM      = ReactDOM
  _createElement = React.createElement
  assertions.setReact(_React, _ReactDOM)

  // replace createElement with our overloaded version
  _React.createElement = function (type, _props = {}, ...children) {
    // fix for props = null
    const props = _props || {}

    // create a refs object to hold the ref.
    // this needs to be an object so that it can be passed
    // by reference, and hold chaning state
    const refs = {}
    const ref = node => refs.node = node
    const newProps  = typeof type === 'string' ? { ...props, ref } : props

    const reactEl   = _createElement(type, newProps, ...children)
    const handler   = failureHandler(options, reactEl, refs)

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
