import {
  importRules
} from '../util'

export default importRules(__dirname, [
  'button-role-space'
, 'hidden-uses-tabindex'
, 'img-uses-alt'
, 'label-uses-for'
, 'mouse-events-map-to-key-events'
, 'onclick-uses-role'
, 'onclick-uses-tabindex'
, 'no-access-key'
, 'no-hash-ref'
, 'redundant-alt'
, 'use-onblur-not-onchange'
, 'valid-aria-role'
, 'tabindex-uses-button'
, 'no-unsupported-elements-use-aria'
, 'avoid-positive-tabindex'
])

