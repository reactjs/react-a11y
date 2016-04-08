import after    from './after'
import validate from './options'
import browser  from './util/browser'
import Suite    from './test'

export default class A11y {

  /**
   * @arg {object} React   - The React instance you want to patch
   * @arg {object} options - the options
   * @returns {A11y} The react-a11y instance
   */
  constructor (React, options = {}) {
    this.options  = validate(options)     // extend default opts
    this.React    = React                 // save react for undoing patches
    this.ReactDOM = this.options.ReactDOM

    if (!this.React && !this.React.createElement) {
      throw new Error('Missing parameter: React')
    }

    this.__sync = false
    this.suite  = new Suite(React, this.options)

    this.patchReact()
  }

  /**
   * Patch React, replacing its createElement by our implementation
   * so we can run the tests
   * @returns {undefined}
   */
  patchReact () {

    // save old createElement
    this._createElement  = this.React.createElement

    const that = this
    this.React.createElement = function (klass, _props = {}, ...children) {

      // fix for props = null
      const props = _props || {}

      // create a refs object to hold the ref.
      // this needs to be an object so that it can be passed
      // by reference, and hold chaning state.
      const refs = typeof props.ref === 'string' ? props.ref : {}
      const ref  = typeof props.ref === 'string'
        ? props.ref
        : function (node) {
          refs.node = node

          // maintain behaviour when ref prop was already set
          if ( typeof props.ref === 'function' ) {
            props.ref(node)
          }
        }

      const newProps  = typeof klass === 'string' ? { ...props, ref } : props

      const reactEl   = that._createElement(klass, newProps, ...children)

      // only test html elements
      if (typeof klass === 'string') {

        const handler         = that.failureHandler(reactEl, refs)
        const childrenForTest = children.length === 0
          ? props.children || []
          : children

        that.suite.test(klass, props, childrenForTest, handler)
      }

      return reactEl
    }
  }

  /**
   * Restore React and all components as if we were never here
   * @returns {undefined}
   */
  restoreAll () {
    this.React.createElement = this._createElement
    after.restorePatchedMethods()
  }

  /**
   * Creates a failure handler based on the element that was created
   * @arg {object} reactEl - The react element this failure is for
   * @arg {object} refs    - The object that holds the DOM node (passed by ref)
   * @returns {function} A handler that knows everything it needs to know
   */
  failureHandler (reactEl, ref) {
    const {
      reporter
    , filterFn
    } = this.options

    /**
     * @arg {string} type  - The HTML tagname of the element
     * @arg {object} props - The props that were passed to the element
     * @arg {string} msg   - The warning message
     * @returns {undefined}
     */
    return function (errInfo) {

      // get the owning component (the one that has
      // the element in its render fn)
      const owner = reactEl._owner

      // if there is an owner, use its name
      // if not, use the tagname of the violating elemnent
      const displayName = owner && owner.getName() || errInfo.tagName

      // stop if we're not allowed to proceed
      if ( !filterFn(displayName, errInfo.props.id, errInfo.msg) ) {
        return
      }

      // gather all info for the reporter
      const info = {
        ...errInfo
      , displayName
      }

      // if we need to include the rendered node, we need to wait until
      // the owner has rendered
      if ( owner && browser && !this.__sync ) {
        const instance = owner._instance
        // Cannot log a node reference until the component is in the DOM,
        // so defer the call until componentDidMount or componentDidUpdate.
        after.render(instance, function () {
          // unpack the ref
          let DOMNode
          if ( typeof ref === 'string' ) {
            DOMNode = this.ReactDOM.findDOMNode(instance.refs[ref])
          } else if ( 'node' in ref ) {
            DOMNode = ref.node
          } else {
            throw new Error('could not resolve ref')
          }

          reporter({ ...info, DOMNode })
        })
      } else {
        reporter(info)
      }
    }.bind(this)
  }

  /**
   * Force A11y in sync mode, DOMNodes might be omitted
   * @arg {boolean} sync - wether or not to force sync mode
   */
  __forceSync (sync = true) {
    this.__sync = !!sync
  }
}
