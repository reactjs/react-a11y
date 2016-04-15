import buttonRoleSpace     from './button-role-space'
import hiddenUsesTabIndex  from './hidden-uses-tabindex'
import imgUsesAlt          from './img-uses-alt'
import labelUsesFor        from './label-uses-for'
import mouseEvents         from './mouse-events-map-to-key-events'
import onclickUsesRole     from './onclick-uses-role'
import onclickUsesTabIndex from './onclick-uses-tabindex'
import noAccessKey         from './no-access-key'
import noHashRef           from './no-hash-ref'
import redundantAlt        from './redundant-alt'
import onBlurNotOnChange   from './use-onblur-not-onchange'
import validAriaRole       from './valid-aria-role'
// import tabIndexUsesButton  from './tabindex-uses-button'

export default {
  'button-role-space': buttonRoleSpace
, 'hidden-uses-tabindex': hiddenUsesTabIndex
, 'img-uses-alt': imgUsesAlt
, 'label-uses-for': labelUsesFor
, 'mouse-events-map-to-key-events': mouseEvents
, 'onclick-uses-role': onclickUsesRole
, 'onclick-uses-tabindex': onclickUsesTabIndex
, 'no-access-key': noAccessKey
, 'no-hash-ref': noHashRef
, 'redundant-alt': redundantAlt
, 'use-onblur-not-onchange': onBlurNotOnChange
, 'valid-aria-role': validAriaRole
// , 'tabindex-uses-button': tabIndexUsesButton
}
