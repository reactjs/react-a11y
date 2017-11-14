import {
    hiddenFromAT
} from '../util';

export default [{
    tagName: 'a',
    msg: 'You have an anchor with a `tabIndex`, no `href` and no `role` DOM property. '
     + 'Add `role="button"` or better yet, use a `<button/>`.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role',
    test(_, props) {
        const hidden = hiddenFromAT(props);
        const href = 'href' in props;
        const button = props.role === 'button';
        const tabIndex = 'tabIndex' in props;

        return hidden || !tabIndex || href || button;
    }
}];

export const fail = [{
    when: 'anchor has tabIndexbut no button',
    // eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/tabindex-no-positive
    render: React => <a tabIndex={1} />
}];

export const pass = [{
    when: 'anchor has no `tabIndex`',
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    render: React => <a />
}, {
    when: 'anchor has `role="button"`',
    // eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/tabindex-no-positive
    render: React => <a role="button" tabIndex={1} />
}, {
    when: 'anchor has a `href`',
    // eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/tabindex-no-positive
    render: React => <a href="foo" tabIndex={1} />
}, {
    when: 'the anchor is hidden',
    // eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/tabindex-no-positive
    render: React => <a tabIndex={1} aria-hidden />
}];

export const description = `
When an anchor has a \`tabIndex\`, but no \`href\` and no \`role\` properties,
it is likely you are using it to emulate a \`button\`.  Prefer using \`role="button"\`
or just use the \`<button\` element.
`;
