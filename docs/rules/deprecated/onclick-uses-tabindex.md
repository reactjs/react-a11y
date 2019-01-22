# onclick-uses-tabindex (deprecated - use interactive-supports-focus)

Enforce that elements that have an `onClick` handler also have
a `tabIndex` property.  If not, they will not be navigable by
keyboard users.


## options

*This rule takes no options*

## Passes

```jsx harmony
// passes when when there is an `onClick` with a `tabIndex`
<span onClick={someFunction} tabindex="0"></span>

// passes when the element is hidden from aria
<span onClick={someFunction} aria-hidden="true"></span>

// passes when the element is interactive
<button onClick={someFunction}></button>
```

## Fails

```jsx harmony
// fails when there is an `onClick` with no `tabIndex`
<span onClick={someFunction}></span>
```

## See also

 - [This document](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_02) from github.com/GoogleChrome
 - [This document](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_generalnav) from w3.org