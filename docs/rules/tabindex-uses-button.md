# tabindex-uses-button

When an anchor has a `tabIndex`, but no `href` and no `role` properties,
it is likely you are using it to emulate a `button`.  Prefer using `role="button"`
or just use the `<button>` element.


## options

*This rule takes no options*

## Passes

```js
// passes when anchor has no `tabIndex`
<a></a>

// passes when anchor has `role="button"`
<a role="button" tabindex="1"></a>

// passes when anchor has a `href`
<a href="foo" tabindex="1"></a>

// passes when the anchor is hidden
<a tabindex="1" aria-hidden="true"></a>
```

## Fails

```js
// fails when anchor has tabIndex but no button
<a tabindex="1"></a>
```

## See also

 - [This document](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role) from developer.mozilla.org
