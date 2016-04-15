# onclick-uses-tabindex


Enforce that elements that have an `onClick` handler also have
a `tabIndex` property.  If not, they will not be navigable by
keyboard users.


## Options

*This rule takes no options*

## Passes

These elements are passed by this rule
```js
// no problem when when there is an `onClick` with a `tabIndex`
<span tabindex="0"></span>

// no problem when the element is hidden from aria
<span></span>

// no problem when the element is interactive
<button></button>
```

## Fails

These elements are *not* passed by this rule
```js
// warns when there is an `onClick` with no `tabIndex`
<span></span>
```

## See also

 - [This document](http://www.w3.org/TR/wai-aria-practices/#focus_tabindex