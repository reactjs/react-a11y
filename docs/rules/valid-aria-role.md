# valid-aria-role


The ARIA roles model requires that elements with a role attribute use a valid,
non-abstract ARIA role. Each non-abstract ARIA role is mapped on to a known set
of behavior by the user agent or assistive technology, so using an unknown role
will result in the desired behavior not being available to the user.

You can find a list of valid ARIA roles, along with descriptions and information
on additional required attributes, on the
[WAI-ARIA](http://www.w3.org/TR/wai-aria/roles#roles_categorization) site.


## Options

*This rule takes no options*

## Passes

These elements are passed by this rule
```js
// no problem when there is a role and it is valid
<div role="button"></div>

// no problem when there is no `role`
<div></div>
```

## Fails

These elements are *not* passed by this rule
```js
// warns when there is an invalid `role`
<div role="foo"></div>
```

## See also

 - [This document](https://www.w3.org/TR/wai-aria/roles)
 - Google Audit defs [AX_ARIA_01](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-defs#ax_aria_01)