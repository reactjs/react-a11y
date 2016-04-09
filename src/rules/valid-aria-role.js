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

export default ctx => function (tagName, props) {
  const role = props.role

  if ( typeof role !== 'undefined' && role !== null && roles.indexOf(role) === -1 ) {
    ctx.report({
      msg: 'Elements with ARIA roles must use a valid, non-abstract ARIA role.'
    , url: 'https://www.w3.org/TR/wai-aria/roles'
    })
  }
}

