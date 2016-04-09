import {
  hiddenFromAT
, listensTo
, devices
, trueish
} from '../util'

export default ctx => function (tagName, props, children) {
  const hidden   = hiddenFromAT(props)
  const disabled = trueish(props, 'ariaDisabled')
  const readOnly = trueish(props, 'ariaReadonly')
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
