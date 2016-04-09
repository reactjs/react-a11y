import {
  hiddenFromAT
} from '../util'

const msg =
    'Form controls using a label to identify them must be'
  + 'programmatically associated with the control using htmlFor'

export default ctx => ({
  label (props) {
    if ( hiddenFromAT(props) ) {
      return
    }
    if ( typeof props.htmlFor !== 'string' ) {
      ctx.report({
        msg
      , url: 'https://www.w3.org/WAI/tutorials/forms/labels'
      })
    }
  }
})
