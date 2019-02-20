import { hasProp, isReadable } from '../util';

export default [
    {
        tagName: 'a',
        msg:
            'Links should contain text, images with alt attributes, or have an ' +
            "aria-label attribute so that users understand the link's purpose.",
        url:
            'https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-refs.html',
        AX: 'AX_TEXT_04',
        test(tagName, props, children) {
            const text = [];

            if (hasProp(props, 'aria-label')) {
                text.push(props['aria-label']);
            }

            const collectTextFromChildren = children => {
                if (typeof children === 'string') {
                    text.push(children);
                    return;
                }
                children.forEach(child => {
                    if (typeof child === 'string') {
                        text.push(child);
                        return;
                    }
                    if (child.type === 'img' && hasProp(child.props, 'alt')) {
                        text.push(child.props.alt);
                    }
                    if (
                        child.props &&
                        typeof child.props.children !== 'undefined'
                    ) {
                        collectTextFromChildren(child.props.children);
                    }
                });
            };

            collectTextFromChildren(children);

            return isReadable(text.join(''));
        }
    }
];

export const fail = [
    {
        when: 'a link is empty',
        // eslint-disable-next-line jsx-a11y/link-is-readable
        render: React => <a href="/home" />
    },
    {
        when: 'a link is just a non-breaking space',
        // eslint-disable-next-line jsx-a11y/link-is-readable
        render: React => <a href="/home">&nbsp;</a>
    },
    {
        when: 'a link has an image with empty alt',
        // eslint-disable-next-line jsx-a11y/link-is-readable
        render: React => (
            <a href="/home">
                <img src="home.png" alt="" />
            </a>
        )
    },
    {
        when: 'a link has an image with empty alt',
        // eslint-disable-next-line jsx-a11y/link-is-readable
        render: React => (
            <a href="/home">
                <img src="home.png" alt="" />
            </a>
        )
    }
];

export const pass = [
    {
        when: 'The link has text',
        render: React => <a href="/home">Homepage</a>
    },
    {
        when: 'The link has text in a descendent',
        render: React => (
            <a href="/home">
                <span>Homepage</span>
            </a>
        )
    },
    {
        when: 'Link has aria-label',
        render: React => <a href="/home" aria-label="Homepage" />
    },
    {
        when: 'a link has an image with an alt attribute',
        // eslint-disable-next-line jsx-a11y/link-is-readable
        render: React => (
            <a href="/home">
                <img src="home.png" alt="Homepage" />
            </a>
        )
    },
    {
        when:
            'a link has an image with an empty alt attribute and there is text',
        // eslint-disable-next-line jsx-a11y/link-is-readable
        render: React => (
            <a href="/home">
                <img src="home.png" alt="" />
                Homepage
            </a>
        )
    }
];

export const description = `
Links should be readable and describe the destination 
or action associated with it. When using images within 
links, the alternate text in the image is read.
`;
