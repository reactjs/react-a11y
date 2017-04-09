import {
    devices,
    hasProp
} from '../util';

export default [{
    msg: 'No `accessKey` attribute allowed. Inconsistencies '
     + 'between keyboard shortcuts and keyboard comments used by screenreader '
     + 'and keyboard only users create a11y complications.',
    url: 'http://webaim.org/techniques/keyboard/accesskey#spec',
    affects: [
        devices.screenReader,
        devices.keyboardOnly
    ],
    test(tagName, props) {
        const accessKey = hasProp(props, 'accessKey');
        return !accessKey;
    }
}];


export const fail = [{
    when: 'there is an `accessKey` prop',
    // eslint-disable-next-line jsx-a11y/no-access-key
    render: React => <div accessKey="a" />
}];

export const pass = [{
    when: 'there is an no `accessKey` prop',
    render: React => <div />
}];

export const description = `
Enforce no accessKey prop on element. Access keys are HTML elements that allow
web developers to assign keyboard shortcuts to elements.  Inconsistencies between
keyboard shortcuts and keyboard commands used by screenreader and keyboard only
users create accessibility complications so to avoid complications, access keys
should not be used.
`;
