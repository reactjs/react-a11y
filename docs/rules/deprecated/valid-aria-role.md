# valid-aria-role (deprecated - use aria-role)

The ARIA roles model requires that elements with a role attribute use a valid,
non-abstract ARIA role. Each non-abstract ARIA role is mapped on to a known set
of behavior by the user agent or assistive technology, so using an unknown role
will result in the desired behavior not being available to the user.

You can find a list of valid ARIA roles, along with descriptions and information
on additional required attributes, on the
[WAI-ARIA](http://www.w3.org/TR/wai-aria/roles#roles_categorization) site.


## options

*This rule takes no options*

## Passes

```jsx harmony
// passes when there is a role and it is valid
<div role="button"></div>

// passes when there is no `role`
<div></div>
```

## Fails

```jsx harmony
// fails when there is an invalid `role`
<div role="foo"></div>
```

## See also

 - [This document](https://www.w3.org/TR/wai-aria/roles) from w3.org - Google Audit defs [AX_ARIA_01](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-defs#ax_aria_01)
