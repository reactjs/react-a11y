import { hasProp, role, warnRuleDeprecated } from '../util';

const roles = Object.keys(role);

export default [
    {
        msg: 'Tables should use header cells.',
        url: 'https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/H51',
        tagName: 'table',
        AX: 'AX_TABLE_01',
        test(tagName, props, children) {
            if (hasProp(props, 'role') && props['role'] === 'presentation') {
                return true;
            }
            let hasHeaderCells = false;

            const findHeaderCells = children => {
                if (typeof children === 'string') {
                    return;
                }
                if (!Array.isArray(children) && children.type) {
                    children = [children];
                }
                children.forEach(child => {
                    if (child.type && child.type === 'th') {
                        hasHeaderCells = true;
                    }
                    if (child.props && child.props.children) {
                        findHeaderCells(child.props.children);
                    }
                });
            };
            findHeaderCells(children);

            return hasHeaderCells;
        }
    }
];

export const fail = [
    {
        when:
            'the table has no table headers, and does not have role of "presentation"',
        // eslint-disable-next-line jsx-a11y/table-has-header-cell
        render: React => (
            <table>
                <tr>
                    <td>a</td>
                    <td>b</td>
                    <td>c</td>
                </tr>
                <tr>
                    <td>a</td>
                    <td>b</td>
                    <td>c</td>
                </tr>
                <tr>
                    <td>a</td>
                    <td>b</td>
                    <td>c</td>
                </tr>
            </table>
        )
    }
];

export const pass = [
    {
        when: 'the table has a role of "presentation"',
        render: React => (
            <table role="presentation">
                <tr>
                    <td>a</td>
                    <td>b</td>
                    <td>c</td>
                </tr>
                <tr>
                    <td>a</td>
                    <td>b</td>
                    <td>c</td>
                </tr>
                <tr>
                    <td>a</td>
                    <td>b</td>
                    <td>c</td>
                </tr>
            </table>
        )
    },
    {
        when: 'the table has header cells',
        render: React => (
            <table>
                <thead>
                    <tr>
                        <th>a</th>
                        <th>b</th>
                        <th>c</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>a</td>
                        <td>b</td>
                        <td>c</td>
                    </tr>
                    <tr>
                        <td>a</td>
                        <td>b</td>
                        <td>c</td>
                    </tr>
                    <tr>
                        <td>a</td>
                        <td>b</td>
                        <td>c</td>
                    </tr>
                </tbody>
            </table>
        )
    }
];

export const description = `
Tables that contain data should contain header cells (th) to label
the content of the table. If a table is purely for presentation, use
a role of "presentation" on the table element.
`;
