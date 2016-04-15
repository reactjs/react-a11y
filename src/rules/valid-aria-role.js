import {
  hasProp
} from '../util'

const roles = [
  'alert', 'alertdialog', 'application', 'article'
, 'banner', 'button', 'checkbox', 'columnheader'
, 'combobox', 'complementary'
, 'contentinfo', 'definition', 'dialog', 'directory'
, 'document', 'form', 'grid', 'gridcell'
, 'group', 'heading', 'img', 'link', 'list', 'listbox'
, 'listitem', 'log', 'main', 'marquee'
, 'math', 'menu', 'menubar', 'menuitem'
, 'menuitemcheckbox', 'menuitemradio', 'navigation', 'note'
, 'option', 'presentation', 'progressbar', 'radio'
, 'radiogroup', 'region', 'row', 'rowgroup', 'rowheader'
, 'scrollbar', 'search', 'separator', 'slider'
, 'spinbutton', 'status', 'tab', 'tablist', 'tabpanel'
, 'textbox', 'timer', 'toolbar', 'tooltip'
, 'tree', 'treegrid', 'treeitem'
]

export default [{
  msg: 'Elements with ARIA roles must use a valid, non-abstract ARIA role.'
, url: 'https://www.w3.org/TR/wai-aria/roles'
, audit: 'AX_ARIA_01'
, test (tagName, props) {
    const role = hasProp(props, 'role')
    return !role || roles.indexOf(props.role) >= 0
  }
}]


export const fail = [{
  when: 'there is an invalid `role`'
, render: React => <div role='foo' />
}]

export const pass = [{
  when: 'there is a role and it is valid'
, render: React => <div role='button' />
}, {
  when: 'there is no `role`'
, render: React => <div />
}]

export const description = `
The ARIA roles model requires that elements with a role attribute use a valid,
non-abstract ARIA role. Each non-abstract ARIA role is mapped on to a known set
of behavior by the user agent or assistive technology, so using an unknown role
will result in the desired behavior not being available to the user.

You can find a list of valid ARIA roles, along with descriptions and information
on additional required attributes, on the
[WAI-ARIA](http://www.w3.org/TR/wai-aria/roles#roles_categorization) site.
`
