# onclick-uses-tabindex

Enforce that elements that have an `onClick` handler also have
a `tabIndex` property.  If not, they will not be navigable by
keyboard users.


## options

*This rule takes no options*

## Passes

```js
// passes when when there is an `onClick` with a `tabIndex`
<span tabindex="0"></span>

// passes when the element is hidden from aria
<span aria-hidden="true"></span>

// passes when the element is interactive
<button></button>
```

## Fails

```js
// fails when there is an `onClick` with no `tabIndex`
<span></span>
```

## See also

 - [This document](http://www.w3.org/TR/wai-aria-practices/#focus_tabindex) from w3.org
