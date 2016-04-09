import {
  hiddenFromAT
, devices
} from '../util'

export default ctx => function (tagName, props) {
  const hidden   = hiddenFromAT(props)
  const tabIndex = props.tabIndex === -1

  if ( hidden && !tabIndex ) {
    ctx.report({
      msg: 'You have `aria-hidden="true"` applied to an interactive element but have not '
         + 'removed it from the tab flow. This could result in a hidden tab stop for '
         + 'users of screen readers.'
    , url: 'http://john.foliot.ca/aria-hidden'
    , affects: [
        devices.keyboardOnly
      , devices.screenReaders
      ]
    })
  }
}
