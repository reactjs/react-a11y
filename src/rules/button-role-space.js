import {
    hiddenFromAT,
    listensTo,
    devices,
    fn
} from '../util';

export default {
    msg: 'You have `role="button"` but did not define an `onKeyDown` or `onKeyPress` handler. '
     + 'Add it, and have the "Space" key do the same thing as an `onClick` handler.',
    url: 'https://www.w3.org/WAI/GL/wiki/Making_actions_keyboard_accessible_by_using_keyboard_event_handlers_with_WAI-ARIA_controls',
    affects: [
        devices.keyboardOnly
    ],
    test(tagName, props) {
        const hidden = hiddenFromAT(props);
        const button = props.role === 'button';
        const onKeyDown = listensTo(props, 'onKeyDown');
        const onKeyPress = listensTo(props, 'onKeyPress');

        // rule passes when element is hidden,
        // has role='button' and has an onKeyDown or onKeyPress prop
        return hidden || !button || onKeyDown || onKeyPress;
    }
};

export const pass = [{
    when: 'role="button" but there is an onKeyDown handler.',
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    render: React => <div role="button" onKeyDown={fn} />
}, {
    when: 'role="button" but there is an onKeyPress handler.',
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    render: React => <div role="button" onKeyPress={fn} />
}, {
    when: 'there is no role',
    render: React => <div >derp</div>
}, {
    when: 'there the role is not button',
    // eslint-disable-next-line jsx-a11y/aria-role
    render: React => <div role="foo" />
}, {
    when: 'the element is aria-hidden',
    render: React => <div aria-hidden role="button" />
}];

export const fail = [{
    when: 'role="button" and no `onKeyDown` or `onKeyPress` is present',
    render: React => <div role="button" />
}];

export const description = `
Enforce that elements which have the \`role="button"\`
also have an \`onKeyDown\` or \`onKeyPress\` handler that handles Space or Enter
(this is isn't actually checked) for poeple that are using a
keyboard-only device.
`;
