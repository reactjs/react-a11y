import {
  hiddenFromAT
, listensTo
, devices
} from '../util'

export default ctx => function (tagName, props, children) {
  const hidden   = hiddenFromAT(props)
  const disabled = props.ariaDisabled === true
  const readOnly = props.ariaReadonly === true
  const onChange = listensTo(props, 'onChange')

  if ( !(hidden || disabled || readOnly)&& onChange ) {
    ctx.report({
      msg: '`onBlur` should be preferred over `onChange`, unless absolutely necessary '
         + 'and it has no negative consequences for keyboard only or screen-reader users.'
    , url: 'http://webaim.org/techniques/javascript/eventhandlers#onchange'
    , affects: [
        devices.keyboardOnly
      , devices.screenReaders
      ]
    })
  }
}
