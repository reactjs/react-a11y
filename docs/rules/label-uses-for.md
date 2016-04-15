# label-uses-for


Enforce label tags have `htmlFor` attribute. Form controls using a `label` to
identify them must have only one label that is programmatically associated with
the control using: `<label htmlFor={/* ID or name of control*/}>...</label>`.


## Options

*This rule takes no options*

## Passes

These elements are passed by this rule
```js
// no problem when the label is hidden
<label aria-hidden="true"></label>

// no problem when the label has a valid `htmlFor` prop
<label for="foo"></label>

// no problem when it is not a label
<div></div>
```

## Fails

These elements are *not* passed by this rule
```js
// warns when a label is not hidden and has no `htmlFor`
<label></label>
```

## See also

 - [This document](https://www.w3.org/WAI/tutorials/forms/labels