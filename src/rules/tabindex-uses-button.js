import {
  isInteractive
, hiddenFromAT
, devices
} from '../util'

export default ctx => ({
  a (props, children) {
    const hidden      = hiddenFromAT(props)
    const href        = 'href' in props
    const button      = props.role === 'button'
    const tabIndex    = 'tabIndex' in props

    // rule fails when the element is not hidden from aria,
    // has role="button" and no onKeyDownHandler
    const bad = !hidden && tabIndex && !href && !button

    if ( bad ) {
      ctx.report({
        msg: 'You have an anchor with a `tabIndex`, no `href` and no `role` DOM property. '
          + 'Add `role="button"` or better yet, use a `<button/>`.'
      , url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role'
      })
    }
  }
})
