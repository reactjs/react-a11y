import {
  isInteractive
, hiddenFromAT
, listensTo
, devices
} from '../util'

export default ctx => function (tagName, props, children) {
  const hidden      = hiddenFromAT(props)
  const interactive = isInteractive(tagName, props)
  const onClick     = listensTo(props, 'onClick')
  const role        = 'role' in props

  // rule fails when the element is not hidden from aria,
  // is non-interactive, but has a click handler and no rol
  const bad = !hidden && !interactive && onClick && !role

  if ( bad ) {
    ctx.report({
      msg: 'You have a click handler on a non-interactive element but no `role` DOM property. '
          + 'It will be unclear what this element is supposed to do to a screen-reader user.'
    , url: 'http://www.w3.org/TR/wai-aria/roles#role_definitions'
    , affects: [
        devices.screenReaders
      ]
    })
  }
}
