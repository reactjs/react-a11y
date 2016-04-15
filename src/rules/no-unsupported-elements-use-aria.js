import {
  DOM
, aria
, hasProp
} from '../util'


export default [{
  msg: 'This element does not support ARIA roles, states and properties.'
, AX: 'AX_ARIA_12'
, test (tagName, props) {
    const reserved = DOM[tagName].reserved || false
    const prop     = hasProp(props, Object.keys(aria).concat('role'))

    return !reserved || !prop
  }
}]

export const description = `
Certain reserved DOM elements do not support ARIA roles, states and properties.
This is often because they are not visible, for example \`meta\`, \`html\`, \`script\`,
\`style\`. This rule enforces that these DOM elements do not contain the \`role\` and/or
\`aria-*\` props.
`

export const fail = [{
  when: 'the element should not be given any ARIA attributes'
, render: React => <meta charset="UTF-8" aria-hidden="false" />
}]

export const pass = [{
  when: 'the reserver element is not given an illegal prop'
, render: React => <meta charset="UTF-8" />
}, {
  when: 'an illegal props is given to a non-reserved elemeent'
, render: React => <div aria-hidden={true} />
}]
