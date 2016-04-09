import browser from './util/browser'

/**
 * Throws an error based on the warning
 * If the last argument is a DOM node, it
 * coerces it to a string before throwing.
 * @returns {undefined}
 */
const throwError = function (...args) {
  const last = args[args.length - 1]
  if ( last.outerHTML ) {
    args[args.length - 1] = `Element: \n  ${last.outerHTML}`
  }

  const error = new Error(args.join(' '))
  error.element = last

  throw error
}

/**
 * Show a warning
 * @returns {undefined}
 */
const showWarning = function (...args) {
  if ( browser ) {
    console.warn(...args)
  } else {
    console.warn(args.join('\n  '))
  }
}

/**
 * Creates a reporter function based on deprecated options
 * @arg {object} opts - The options passed by the user
 * @returns {function} The reporter
 */
const mkReporter = function (opts) {
  const {
    doThrow        = false
  , warningPrefix  = ''
  } = opts

  return function (info) {
    const {
      msg
    , displayName
    , DOMNode
    , url
    , tagName
    , severity
    } = info

    // build warning
    const warning = [
      displayName || tagName
    , warningPrefix.concat(msg)
    , `See '${url}' for more info.`
    , DOMNode || tagName
    ]

    if ( doThrow || severity === 'error' ) {
      throwError(...warning)
    } else {
      showWarning(...warning)
    }
  }
}

/**
 * Generate a deprecation warning when a key is present
 * in the options object
 * @arg {object} opts - the options object under scrutiny
 * @arg {string} name - the name of the deprecated option
 * @arg {string} msg  - an optional reason for the deprecation
 * @returns {undefined}
 */
const deprecate = function (opts, name, msg = '') {
  if ( name in opts ) {
    console.warn(`react-a11y: the \`${name}\` options is deprecated. ${msg}`)
  }
}

/**
 * Make a certain option mandatory
 * @arg {object} opts - the options object under scrutiny
 * @arg {string} name - the name of the mandatory option
 * @arg {string} msg  - an optional reason
 * @returns {undefined}
 */
const mandatory = function (opts, name, msg = '') {
  if ( !(name in opts) ) {
    throw new Error(`react-a11y: the \`${name}\` option is mandatory. ${msg}`)
  }
}

// always resolve to true
const always = () => true

// deprecation message
const msg = 'Use the `reporter` option to change how warnings are displayed.'

/**
 * Normalize and validate the options that the user passed in.
 * @arg {object} opts - The opts the user passed in
 * @returns {object} the validated options
 */
export default function (...args) {

  // signature is a11y(React, opts) or a11y(React, ReactDOM, opts)
  // so destructure args based on number of args passed
  const [
    React
  , ReactDOM
  , opts
  ] = args.length === 3 ? args : [args[0], null, args[1] || {}]

  if (!React || !React.createElement) {
    throw new Error('react-a11y: missing argument `React`')
  }

  // make sure ReactDOM is passed in in browser code
  if ( browser && !(ReactDOM && ReactDOM.version) ) {
    throw new Error('react-a11y: missing argument `ReactDOM`')
  }

  deprecate(opts, 'includeSrcNode', msg)
  deprecate(opts, 'throw',          msg)
  deprecate(opts, 'warningPrefix',  msg)

  const {
    reporter     = mkReporter(opts) // make a reporter based on options
  , filterFn     = always
  , plugins      = []
  , rules        = {}
  } = opts

  return {
    React
  , ReactDOM
  , filterFn
  , reporter
  , plugins
  , rules
  }
}

