import {
    devices,
    listensTo,
    fn,
    warnRuleDeprecated
} from '../util';


const url = 'http://webaim.org/techniques/javascript/eventhandlers#onmouseover';
const affects = [
    devices.keyboardOnly
];

export default [{
    msg: 'onMouseOver must be accompanied by onFocus for accessibility.',
    url,
    affects,
    test(tagName, props) {
        warnRuleDeprecated('mouse-events-map-to-key-events', 'mouse-events-have-key-events');
        const mouseOver = listensTo(props, 'onMouseOver');
        const focus = listensTo(props, 'onFocus');

        return !mouseOver || focus;
    }
}, {
    msg: 'onMouseOut must be accompanied by onBlur for accessibility.',
    url,
    affects,
    test(tagName, props) {
        const mouseOut = listensTo(props, 'onMouseOut');
        const blur = listensTo(props, 'onBlur');

        return !mouseOut || blur;
    }
}];

export const fail = [{
    when: 'there is `onMouseOver` but no `onFocus`',
    render: React => <div onMouseOver={fn} />
}, {
    when: 'there is `onMouseOut` but no `onBlur`',
    render: React => <div onMouseOut={fn} />
}];

export const pass = [{
    when: 'there is no `onMouseOver` or `onMouseOut`',
    render: React => <div />
}, {
    when: 'there is `onMouseOver` but and `onFocus`',
    render: React => <div onMouseOver={fn} onFocus={fn} />
}, {
    when: 'there is `onMouseOut` but and `onBlur`',
    render: React => <div onMouseOut={fn} onBlur={fn} />
}];


export const description = `
Enforce \`onMouseOver\`/\`onMouseOut\` are accompanied by
\`onFocus\`/\`onBlur\`. Coding for the keyboard is important for users with
physical disabilities who cannot use a mouse, AT compatability, and screenreader
users.
`;
