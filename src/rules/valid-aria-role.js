import {
    hasProp,
    role,
    warnRuleDeprecated
} from '../util';

const roles = Object.keys(role);

export default [{
    msg: 'Elements with ARIA roles must use a valid, non-abstract ARIA role.',
    url: 'https://www.w3.org/TR/wai-aria/roles',
    AX: 'AX_ARIA_01',
    test(tagName, props) {
        warnRuleDeprecated('valid-aria-role', 'aria-role');
        const hasRole = hasProp(props, 'role');
        return !hasRole || roles.indexOf(props.role) >= 0;
    }
}];

export const fail = [{
    when: 'there is an invalid `role`',
    // eslint-disable-next-line jsx-a11y/aria-role
    render: React => <div role="foo" />
}];

export const pass = [{
    when: 'there is a role and it is valid',
    render: React => <div role="button" />
}, {
    when: 'there is no `role`',
    render: React => <div />
}];

export const description = `
The ARIA roles model requires that elements with a role attribute use a valid,
non-abstract ARIA role. Each non-abstract ARIA role is mapped on to a known set
of behavior by the user agent or assistive technology, so using an unknown role
will result in the desired behavior not being available to the user.

You can find a list of valid ARIA roles, along with descriptions and information
on additional required attributes, on the
[WAI-ARIA](http://www.w3.org/TR/wai-aria/roles#roles_categorization) site.
`;
