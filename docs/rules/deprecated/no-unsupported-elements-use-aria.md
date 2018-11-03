# no-unsupported-elements-use-aria (deprecated - use aria-unsupported-elements)


Certain reserved DOM elements do not support ARIA roles, states and properties.
This is often because they are not visible, for example `meta`, `html`, `script`,
`style`. This rule enforces that these DOM elements do not contain the `role` and/or
`aria-*` props.


## Options

*This rule takes no options*

## Passes

These elements are passed by this rule
```jsx harmony
// no problem when the reserved element is not given an illegal prop
<meta/>

// no problem when an illegal props is given to a non-reserved elemeent
<div aria-hidden="true"></div>
```

## Fails

These elements are *not* passed by this rule
```jsx harmony
// warns when the element should not be given any ARIA attributes
<meta aria-hidden="false"/>
```

## See also

 - Google Audit defs [AX_ARIA_12](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-defs#ax_aria_12)
