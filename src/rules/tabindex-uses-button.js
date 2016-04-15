import {
  hiddenFromAT
} from '../util'

export default [{
  tagName: 'a'
, msg: 'You have an anchor with a `tabIndex`, no `href` and no `role` DOM property. '
     + 'Add `role="button"` or better yet, use a `<button/>`.'
, url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role'
, test (_, props) {
    const hidden      = hiddenFromAT(props)
    const href        = 'href' in props
    const button      = props.role === 'button'
    const tabIndex    = 'tabIndex' in props

    return hidden || !tabIndex || href || button
  }
}]

export const fail = [{
  when: 'anchor has tabIndexbut no button'
, render: React => <a tabIndex={1} />
}]

export const pass = [{
  when: 'anchor has no `tabIndex`'
, render: React => <a  />
}, {
  when: 'anchor has `role="button"`'
, render: React => <a role='button' tabIndex={1} />
}, {
  when: 'anchor has a `href`'
, render: React => <a href='foo' tabIndex={1} />
}, {
  when: 'the anchor is hidden'
, render: React => <a tabIndex={1} ariaHidden />
}]

export const description = `
When an anchor has a \`tabIndex\`, but no \`href\` and no \`role\` properties,
it is likely you are using it to emulate a \`button\`.  Prefer using \`role="button"\`
or just use the \`<button\` element.
`
