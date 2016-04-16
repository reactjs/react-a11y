# onclick-uses-role


Enforce visible, non-interactive elements with click handlers use role
attribute. Visible means that it is not hidden from a screen reader. Examples of
non-interactive elements are `div`, `section`, and a elements without a `href`
prop.The purpose of the role attribute is to identify to screenreaders the exact
function of an element.


## Options

*This rule takes no options*

## Passes

These elements are passed by this rule
```js
// no problem when the element is hidden from aria
<span aria-hidden="true"></span>

// no problem when there is an `onClick` with a `role`
<span role="button"></span>

// no problem when the element is interactive
<button></button>
```

## Fails

These elements are *not* passed by this rule
```js
// warns when there is an `onClick` with no `role`
<span></span>
```

## See also

 - [This document](http://www.w3.org/TR/wai-aria/roles#role_definitions)