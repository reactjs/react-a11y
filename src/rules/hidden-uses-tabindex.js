import {
  hiddenFromAT
, devices
, isInteractive
} from '../util'


export default [{
  msg: 'You have `aria-hidden="true"` applied to an interactive element but have not '
      + 'removed it from the tab flow. This could result in a hidden tab stop for '
      + 'users of screen readers.'
, url: 'http://john.foliot.ca/aria-hidden'
, affects: [
    devices.keyboardOnly
  , devices.screenReaders
  ]
, test(tagName, props) {
    const hidden      = hiddenFromAT(props)
    const interactive = isInteractive(tagName, props)
    const tabIndex    = props.tabIndex === -1

    return !hidden || !interactive || tabIndex
  }
}]


export const pass = [{
  when: 'an interactive element is aria-hidden and has tabindex="-1"'
, render: React => <input aria-hidden={true} tabIndex={-1} />
}, {
  when: 'the element is not interactive'
, render: React => <div aria-hidden={true} />
}, {
  when: 'an interactive element is not aria-hidden'
, render: React => <input />
}]

export const fail = [{
  when: 'an interactive element is hidden but has no tabindex'
, render: React => <input aria-hidden={true} />
}, {
  when: 'an interactive element is hidden but has a bad tabindex'
, render: React => <input aria-hidden={true} tabIndex={2} />
}]
