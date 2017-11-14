import {
    devices,
    hiddenFromAT,
    hasProp
} from '../util';

// test will be run in order
export default [{
    tagName: 'img',
    msg: 'The img does not have an `alt` prop, screen-readers will not know what it is',
    url: 'https://dev.w3.org/html5/alt-techniques',
    test(tagName, props) {
        const hidden = hiddenFromAT(props);
        const alt = hasProp(props, 'alt');

        return hidden || alt;
    },
    affects: [
        devices.screenReaders
    ]
},
{
    tagName: 'img',
    msg: 'The `alt` prop cannot be empty string if role="presentation" is not set.',
    url: 'https://www.w3.org/TR/wai-aria/roles#presentation',
    test(tagName, props) {
        const hidden = hiddenFromAT(props);
        const empty = props.alt === '';
        const pres = props.role === 'presentation';

        return hidden || !empty || pres;
    },
    affects: [
        devices.screenReaders
    ]
}];

export const pass = [
    {
        when: 'the img has an `alt`',
        render: React => <img src="foo" alt="nice" />
    },
    {
        when: 'the img has an empty `alt` and role="presentation"',
        render: React => <img src="foo" alt="" role="presentation" />
    },
    {
        when: 'the img is aria-hidden',
        // eslint-disable-next-line jsx-a11y/img-has-alt
        render: React => <img src="foo" aria-hidden />
    }
];

export const fail = [
    {
        when: 'the img doen\'t have an `alt`',
        // eslint-disable-next-line jsx-a11y/img-has-alt
        render: React => <img src="foo" />
    },
    {
        when: 'the img has alt="" but no role="presentation"',
        render: React => <img src="foo" alt="" />
    }
];

export const description = `
Enforce that an \`img\` element contains the \`alt\` prop. The \`alt\` attribute specifies
an alternate text for an image, if the image cannot be displayed.
`;
