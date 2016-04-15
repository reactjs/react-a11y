# tabindex-uses-button


When an anchor has a `tabIndex`, but no `href` and no `role` properties,
it is likely you are using it to emulate a `button`.  Prefer using `role="button"`
or just use the `<button` element.


## Options

*This rule takes no options*

## Passes

These elements are passed by this rule
```js
// no problem when anchor has no `tabIndex`
<a></a>

// no problem when anchor has `role="button"`
<a role="button" tabindex="1"></a>

// no problem when anchor has a `href`
<a href="foo" tabindex="1"></a>

// no problem when the anchor is hidden
<a tabindex="1"></a>
```

## Fails

These elements are *not* passed by this rule
```js
// warns when anchor has tabIndexbut no button
<a tabindex="1"></a>
```

## See also

 - [This document](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role