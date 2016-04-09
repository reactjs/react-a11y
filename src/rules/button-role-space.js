import {
  hiddenFromAT
, listensTo
, devices
} from '../util'

export default ctx => function (tagName, props) {
  const hidden      = hiddenFromAT(props)
  const button      = props.role === 'button'
  const onKeyDown   = listensTo(props, 'onKeyDown')

  // rule fails when the element is not hidden from aria,
  // has role="button" and no onKeyDownHandler
  const bad = !hidden && button && !onKeyDown

  if ( bad ) {
    ctx.report({
      msg: 'You have `role="button"` but did not define an `onKeyDown` handler. '
         + 'Add it, and have the "Space" key do the same thing as an `onClick` handler.'
    , url: 'https://www.w3.org/WAI/GL/wiki/Making_actions_keyboard_accessible_by_using_keyboard_event_handlers_with_WAI-ARIA_controls'
    , affects: [
        devices.keyboardOnly
      ]
    })
  }
}
