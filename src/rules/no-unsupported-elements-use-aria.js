import {
    DOM,
    aria,
    hasProp,
    warnRuleDeprecated
} from '../util';


export default [{
    msg: 'This element does not support ARIA roles, states and properties.',
    AX: 'AX_ARIA_12',
    test(tagName, props) {
        warnRuleDeprecated('no-unsupported-elements-use-aria', 'aria-unsupported-elements');
        const reserved = (Object.prototype.hasOwnProperty.call(DOM, tagName) && DOM[tagName].reserved) || false;
        const prop = hasProp(props, Object.keys(aria).concat('role'));

        return !reserved || !prop;
    }
}];

export const description = `
Certain reserved DOM elements do not support ARIA roles, states and properties.
This is often because they are not visible, for example \`meta\`, \`html\`, \`script\`,
\`style\`. This rule enforces that these DOM elements do not contain the \`role\` and/or
\`aria-*\` props.
`;

export const fail = [{
    when: 'the element should not be given any ARIA attributes',
    // eslint-disable-next-line jsx-a11y/aria-unsupported-elements
    render: React => <meta charSet="UTF-8" aria-hidden="false" />
}];

export const pass = [{
    when: 'the reserved element is not given an illegal prop',
    render: React => <meta charSet="UTF-8" />
}, {
    when: 'an illegal prop is given to a non-reserved element',
    render: React => <div aria-hidden />
}, {
    when: 'an illegal prop is given to an unknown element',
    render: React => <g aria-hidden />
}];
