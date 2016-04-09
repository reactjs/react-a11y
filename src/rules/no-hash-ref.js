import {
  isInteractive
, hiddenFromAT
, listensTo
, devices
} from '../util'

export default ctx => function (tagName, props, children) {
  if ( 'accessKey' in props ) {
    ctx.report({
      msg: 'No `accessKey` attribute allowed. Inconsistencies '
         + 'between keyboard shortcuts and keyboard comments used by screenreader '
         + 'and keyboard only users create a11y complications.'
    , url: 'http://webaim.org/techniques/keyboard/accesskey#spec'
    , affects: [
        devices.screenReader
      , devices.keyboardOnly
      ]
    })
  }
}
