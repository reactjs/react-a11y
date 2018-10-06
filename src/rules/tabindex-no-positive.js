import {
  hasProp
} from '../util';


export const description = `
Keyboard users move focus from one form control to the next by using the tab
key. By default focus order is determined by source order.

The \`tabIndex\` prop allows the author to specify an alternative tab order.
Elements with a \`tabIndex\` value greater than zero will receive focus in numerical
order, ahead of focusable elements with a \`tabIndex\` of zero.

It is recommended that authors avoid positive values for the \`tabIndex\` attribute
because it is brittle (any focusable elements added to the page without an
explicit \`tabIndex\` value greater than zero will come last in the tab order) and
can easily result in a page which is extremely difficult to navigate, causing
accessibility problems.
`;

export default [{
    msg: 'Avoid positive integer values for `tabIndex`.',
    AX: 'AX_FOCUS_03',
    test(_, props) {
        const tabIndex = hasProp(props, 'tabIndex');
        return !tabIndex || props.tabIndex <= 0;
    }
}];

export const pass = [{
    when: 'the element has no tabIndex',
    render: React => <div />
}, {
    when: 'the element has a negative tabIndex',
    render: React => <div tabIndex={-1} />
}, {
    when: 'the element has a tabIndex of zero',
    render: React => <div tabIndex="0" />
}];

export const fail = [{
    when: 'the element has a positive tabIndex',
    // eslint-disable-next-line jsx-a11y/tabindex-no-positive
    render: React => <div tabIndex={2} />
}];
