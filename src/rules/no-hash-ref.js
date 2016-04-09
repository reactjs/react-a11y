import {
  devices
} from '../util'

export default ctx => ({
  a (props, children) {
    if ( props.href && props.href === '#' ) {
      ctx.report({
        msg: 'Links must not point to `#`. '
           + 'Use a more descriptive href or use a button instead.'
      , url: 'http://webaim.org/techniques/hypertext/'
      })
    }
  }
})
