import {
  hiddenFromAT
, listensTo
, devices
, trueish
, fn
} from '../util'

export default [{
  msg: '`onBlur` should be preferred over `onChange`, unless absolutely necessary '
    + 'and it has no negative consequences for keyboard only or screen-reader users.'
, url: 'http://webaim.org/techniques/javascript/eventhandlers#onchange'
, affects: [
    devices.keyboardOnly
  , devices.screenReaders
  ]
, test (tagName, props) {
    const hidden   = hiddenFromAT(props)
    const disabled = trueish(props, 'ariaDisabled')
    const readOnly = trueish(props, 'ariaReadonly')
    const onChange = listensTo(props, 'onChange')

    return hidden || disabled || readOnly || !onChange
  }
}]


export const pass = [{
  when: 'there is no `onChange` prop'
, render: React => <input />
}, {
  when: 'the element is aria-hidden'
, render: React => <input onChange={fn} ariaHidden />
}, {
  when: 'the element is aria-disabled'
, render: React => <input onChange={fn} ariaDisabled />
}, {
  when: 'the element is aria-readonly'
, render: React => <input onChange={fn} ariaReadonly />
}]

export const fail = [{
  when: 'the `onChange` prop is present'
, render: React => <input onChange={fn} />
}]

export const description = `
Enforce usage of onBlur over onChange for accessibility. onBlur must be used
instead of onChange, unless absolutely necessary and it causes no negative
consequences for keyboard only or screen reader users.
`
