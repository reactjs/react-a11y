# onclick-uses-role

Enforce visible, non-interactive elements with click handlers use role
attribute. Visible means that it is not hidden from a screen reader. Examples of
non-interactive elements are `div`, `section`, and a elements without a `href`
prop. The purpose of the role attribute is to identify to screenreaders the exact
function of an element.


## options

*This rule takes no options*

## Passes

```js
// passes when the element is hidden from aria
<span aria-hidden="true"></span>

// passes when there is an `onClick` with a `role`
<span role="button"></span>

// passes when the element is interactive
<button></button>
```

## Fails

```js
// fails when there is an `onClick` with no `role`
<span></span>
```

## See also

 - [This document](https://www.w3.org/WAI/PF/aria/roles#role_definitions) from w3.org
