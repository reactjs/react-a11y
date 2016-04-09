export default ctx => ({
  a (props) {
    if ( props.href && props.href === '#' ) {
      ctx.report({
        msg: 'Links must not point to `#`. '
           + 'Use a more descriptive href or use a button instead.'
      , url: 'http://webaim.org/techniques/hypertext/'
      })
    }
  }
})
