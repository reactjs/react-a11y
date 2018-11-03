import {
    hiddenFromAT,
    listensTo,
    devices,
    trueish,
    fn,
    warnRuleDeprecated
} from '../util';

export default [{
    msg: '`onBlur` should be preferred over `onChange`, unless absolutely necessary '
    + 'and it has no negative consequences for keyboard only or screen-reader users.',
    url: 'http://webaim.org/techniques/javascript/eventhandlers#onchange',
    affects: [
        devices.keyboardOnly,
        devices.screenReaders
    ],
    test(tagName, props) {
        warnRuleDeprecated('use-onblur-not-onchange', 'no-onchange');
        const hidden = hiddenFromAT(props);
        const disabled = trueish(props, 'aria-disabled');
        const readOnly = trueish(props, 'aria-readonly');
        const onChange = listensTo(props, 'onChange');
        const onBlur = listensTo(props, 'onBlur');

        return hidden || disabled || readOnly || !onChange || (onChange && onBlur);
    }
}];


export const pass = [{
    when: 'there is no `onChange` prop',
    render: React => <input />
}, {
    when: 'the element is aria-hidden',
    render: React => <input onChange={fn} aria-hidden />
}, {
    when: 'the element is aria-disabled',
    render: React => <input onChange={fn} aria-disabled />
}, {
    when: 'the element is aria-readonly',
    render: React => <input onChange={fn} aria-readonly />
}, {
    when: 'the `onChange` prop is present along with an `onBlur` prop',
    render: React => <input onChange={fn} onBlur={fn} />
}];

export const fail = [{
    when: 'the `onChange` prop is present without an `onBlur` prop',
    render: React => <input onChange={fn} />
}];

export const description = `
Enforce usage of onBlur over onChange for accessibility. onBlur must be used
instead of onChange, unless absolutely necessary and it causes no negative
consequences for keyboard only or screen reader users.
`;
