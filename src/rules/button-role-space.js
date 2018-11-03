import {
    hiddenFromAT,
    listensTo,
    devices,
    fn,
    warnRuleDeprecated
} from '../util';

export default {
    msg: 'You have an `onClick` handler but did not define an `onKeyDown`, `onKeyUp` or `onKeyPress` handler. '
     + 'Add it, and have the "Space" key do the same thing as an `onClick` handler.',
    url: 'https://www.w3.org/WAI/GL/wiki/Making_actions_keyboard_accessible_by_using_keyboard_event_handlers_with_WAI-ARIA_controls',
    affects: [
        devices.keyboardOnly
    ],
    test(tagName, props) {
        warnRuleDeprecated('button-role-space', 'click-events-have-key-events');
        const hidden = hiddenFromAT(props);
        const onClick = listensTo(props, 'onClick');
        const onKeyDown = listensTo(props, 'onKeyDown');
        const onKeyUp = listensTo(props, 'onKeyUp');
        const onKeyPress = listensTo(props, 'onKeyPress');

        // rule passes when element is hidden,
        // has onClick and has an onKeyDown, onKeyUp or onKeyPress prop
        return hidden || !onClick || onKeyDown || onKeyUp || onKeyPress;
    }
};

export const pass = [{
    when: 'there is an onClick handler and there is an onKeyDown handler.',
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    render: React => <div onClick={fn} onKeyDown={fn} />
}, {
    when: 'there is an onClick handler and there is an onKeyUp handler.',
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    render: React => <div onClick={fn} onKeyUp={fn} />
}, {
    when: 'there is an onClick handler and there is an onKeyPress handler.',
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    render: React => <div onClick={fn} onKeyPress={fn} />
}, {
    when: 'there is no onClick',
    render: React => <div >derp</div>
}, {
    when: 'the element is aria-hidden',
    render: React => <div aria-hidden role="button" />
}];

export const fail = [{
    when: 'there is an onClick handler but no `onKeyDown`, `onKeyUp` or `onKeyPress` is present',
    render: React => <div onClick={fn} />
}];

export const description = `
Enforce that elements which have the \`role="button"\`
also have an \`onKeyDown\` or \`onKeyPress\` handler that handles Space or Enter
(this is isn't actually checked) for people that are using a
keyboard-only device.
`;
