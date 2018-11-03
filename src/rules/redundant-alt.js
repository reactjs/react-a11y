import {
    devices,
    hiddenFromAT,
    warnRuleDeprecated
} from '../util';

const def = [
    'image',
    'picture',
    'photo'
];

export default [{
    tagName: 'img',
    msg: 'Redundant `alt` attribute. Screen-readers already announce `img` tags as an image. '
     + 'You don\'t need to use the words like `image`, `photo,` or `picture` in the alt prop.',
    url: 'http://webaim.org/techniques/alttext',
    affects: [
        devices.screenReaders
    ],
    test(_, props, _c, ctx) {
        warnRuleDeprecated('redundant-alt', 'img-redundant-alt');
        const hidden = hiddenFromAT(props);
        const alt = (props.alt || '').toLowerCase();
        const words = ctx.options[0] || def;
        const contains = words.reduce((acc, word) => acc || (alt.indexOf(word) >= 0), false);

        return hidden || !contains;
    }
}];

export const fail = [{
    when: 'is a redundant alt message',
    // eslint-disable-next-line jsx-a11y/img-redundant-alt
    render: React => <img src="foo" alt="bar image foo" />
}, {
    when: 'is a redundant alt message (different opts)',
    opts: [['foto']],
    render: React => <img src="foo" alt="bar foto" />
}];

export const pass = [{
    when: 'the `alt` does not contain redundant words',
    render: React => <img src="foo" alt="nice" />
}, {
    when: 'the `alt` does not contain redundant words (different opts)',
    opts: [['foto']],
// eslint-disable-next-line jsx-a11y/img-redundant-alt
    render: React => <img src="foo" alt="image" />
}, {
    when: 'the element is aria-hidden',
    render: React => <img src="foo" alt="nice" aria-hidden />
}];

export const description = `
Enforce img alt attribute does not contain the word image, picture, or photo.
Screenreaders already announce \`img\` elements as an image. There is no need to use
words such as *image*, *photo*, and/or *picture*.
`;

export const options = [{
    type: 'Array(String)',
    description: 'Words to look for when looking for redudant words.',
    def
}];
