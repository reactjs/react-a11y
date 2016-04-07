import after   from './after'
import defs    from './defaults'
import browser from './util/browser'

class A11y {

  /**
   * @arg React            - The React instance you want to patch
   * @arg {object} options - the options
   */
  constructor (React, options = {}) {
    this.options  = defs(options)  // extend default opts
    this.React    = React          // save react for undoing patches
    this.ReactDOM = opts.ReactDOM  // save ReactDOM, we'll need it

    if (!this.React && !this.React.createElement) {
      throw new Error('Missing parameter: React')
    }

    if (!this.ReactDOM) {
      throw new Error('Missing option: ReactDOM')
    }

    this.patchReact()
  }

  /**
   * Patch React, replacing its createElement by our implementation
   * so we can run the tests
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
      const refs = {}
      const ref = function (node) {
        refs.node = node

        // maintain behaviour when ref prop was already set
        if ( typeof props.ref === 'function' ) {
          props.ref(node)
        } else if ( typeof props.ref === 'string' ) {
          // TODO: fix this
          throw new Error('react-a11y does not support string refs yet')
        }
      }
      // TODO: make sure we don't override existing refs or fix it up so it
      // does not matter
      const newProps  = typeof klass === 'string' ? { ...props, ref } : props

      const reactEl   = that._createElement(type, newProps, ...children)

      // only test html elements
      if (typeof klass === 'string') {

        const handler         = that.failureHandler(reactEl, refs)
        const childrenForTest = children.length === 0
          ? props.children || []
          : children

        runTests(klass, props, childrenForTest, that.options, handler)
      }

      return reactEl
    }
  }

  /**
   * Restore React and all components as if we were never here
   */
  restoreAll () {
    this.React.createElement = this._createElement
    after.restorePatchedMethods()
  }

  /**
   * Creates a failure handler based on the element that was created
   * @arg reactEl - The react element this failure is for
   * @arg refs    - The object that holds the DOM node (passed by ref)
   */
  failureHandler (reactEl, refs) {
    const {
      reporter
    , filterFn
    } = this.options

    /**
     * @arg {string} type  - The HTML tagname of the element
     * @arg {object} props - The props that were passed to the element
     * @arg {string} msg   - The warning message
     */
    return function (type, props, msg) {

      // get the owning component (the one that has
      // the element in its render fn)
      const owner = reactEl._owner

      // if there is an owner, use its name
      // if not, use the tagname of the violating elemnent
      const displayName = owner && owner.getName  || type

      // stop if we're not allowed to proceed
      if ( !filterFn(displayName, props.id, msg) ) {
        return
      }

      // gather all info for the reporter
      const info = {
        displayName
      , msg
      }

      // if we need to include the rendered node, we need to wait until
      // the owner has rendered
      if ( owner && browser ) {
        const instance = component._instance
        // Cannot log a node reference until the component is in the DOM,
        // so defer the call until componentDidMount or componentDidUpdate.
        after.render(instance, function () {
          // unpack the ref
          const DOMNode = refs.node

          reporter({ ...info, DOMNode })
        })
      } else {
        reporter(info)
      }
    }
  }
}
