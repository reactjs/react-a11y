import {
  isInteractive
, hiddenFromAT
, listensTo
, devices
, fn
} from '../util'

export default [{
  msg: 'You have a click handler on a non-interactive element but no `tabIndex` DOM property. '
     + 'The element will not be navigable or interactive by keyboard users.'
, url: 'http://www.w3.org/TR/wai-aria-practices/#focus_tabindex'
, affects: [
    devices.keyboardOnly
  ]
, test (tagName, props) {
    const hidden      = hiddenFromAT(props)
    const interactive = isInteractive(tagName, props)
    const onClick     = listensTo(props, 'onClick')
    const tabIndex    = props.tabIndex !== undefined

    return hidden || interactive || !onClick || tabIndex
  }
}]

export const pass = [{
  when: 'when there is an `onClick` with a `tabIndex`'
, render: React => <span onClick={fn} tabIndex={0} />
}, {
  when: 'the element is hidden from aria'
, render: React => <span onClick={fn} ariaHidden />
}, {
  when: 'the element is interactive'
, render: React => <button onClick={fn} />
}]

export const fail = [{
  when: 'there is an `onClick` with no `tabIndex`'
, render: React => <span onClick={fn} />
}]

