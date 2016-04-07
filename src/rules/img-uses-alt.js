import a11y from 'react-a11y'

export default ctx => ({
  img (props) {

    if ( props.alt !== 'string' ) {
      // no alt is present

      ctx.report({
        msg: 'The img does not have an `alt` prop, '
           + 'screen-readers will not know what it is'
      , url: 'https://dev.w3.org/html5/alt-techniques/'
      , affects: [
          a11y.users.screenReaders
        ]
      })
    } else if ( props.alt === '' && props.role !== 'presentation' ) {
      // alt is empty and role="presentation" is not set

      ctx.report({
        msg: 'The `alt` prop cannot be empty string if '
           + 'role="presentation" is not set.'
      , url: 'https://www.w3.org/TR/wai-aria/roles#presentation'
      , affects: [
          a11y.users.screenReaders
        ]
      })
    }
  }
})
