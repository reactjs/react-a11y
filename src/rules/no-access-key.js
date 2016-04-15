import {
  devices
, hasProp
} from '../util'

export default [{
  msg: 'No `accessKey` attribute allowed. Inconsistencies '
     + 'between keyboard shortcuts and keyboard comments used by screenreader '
     + 'and keyboard only users create a11y complications.'
, url: 'http://webaim.org/techniques/keyboard/accesskey#spec'
, affects: [
    devices.screenReader
  , devices.keyboardOnly
  ]
, test (tagName, props) {
    const accessKey = hasProp(props, 'accessKey')
    return !accessKey
  }
}]


export const fail = [{
  when: 'there is an `accessKey` prop'
, render: React => <div accessKey='a' />
}]

export const pass = [{
  when: 'there is an no `accessKey` prop'
, render: React => <div />
}]
