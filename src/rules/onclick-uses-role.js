import {
    isInteractive,
    hiddenFromAT,
    listensTo,
    devices,
    fn
} from '../util';

export default [{
    msg: 'You have a click handler on a non-interactive element but no `role` DOM property. '
     + 'It will be unclear what this element is supposed to do to a screen-reader user.',
    url: 'https://www.w3.org/WAI/PF/aria/roles#role_definitions',
    affects: [
        devices.screenReaders
    ],
    test(tagName, props) {
        const hidden = hiddenFromAT(props);
        const interactive = isInteractive(tagName, props);
        const onClick = listensTo(props, 'onClick');
        const role = 'role' in props;

        return hidden || interactive || !onClick || role;
    }
}];

export const fail = [{
    when: 'there is an `onClick` with no `role`',
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    render: React => <span onClick={fn} />
}];

export const pass = [{
    when: 'the element is hidden from aria',
    render: React => <span onClick={fn} aria-hidden />
}, {
    when: 'there is an `onClick` with a `role`',
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    render: React => <span onClick={fn} role="button" />
}, {
    when: 'the element is interactive',
    render: React => <button onClick={fn} />
}];

export const description = `
Enforce visible, non-interactive elements with click handlers use role
attribute. Visible means that it is not hidden from a screen reader. Examples of
non-interactive elements are \`div\`, \`section\`, and a elements without a \`href\`
prop.The purpose of the role attribute is to identify to screenreaders the exact
function of an element.
`;
