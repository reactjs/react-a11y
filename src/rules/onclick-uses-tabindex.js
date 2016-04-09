import {
  isInteractive
, hiddenFromAT
, listensTo
, devices
} from '../util'

export default ctx => function (tagName, props) {
  const hidden      = hiddenFromAT(props)
  const interactive = isInteractive(tagName, props)
  const onClick     = listensTo(props, 'onClick')
  const tabIndex    = props.tabIndex !== undefined

  // rule fails when the element is not hidden from aria,
  // is non-interactive, but has a click handler and no tabindex
  const bad = !hidden && !interactive && onClick && !tabIndex

  if ( bad ) {
    ctx.report({
      msg: 'You have a click handler on a non-interactive element but no `tabIndex` DOM property. '
          + 'The element will not be navigable or interactive by keyboard users.'
    , url: 'http://www.w3.org/TR/wai-aria-practices/#focus_tabindex'
    , affects: [
        devices.keyboardOnly
      ]
    })
  }
}
