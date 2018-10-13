# label-has-for

Enforce label tags have `htmlFor` attribute. Form controls using a `label` to
identify them must have only one label that is programmatically associated with
the control using: `<label htmlFor={/* ID or name of control*/}>...</label>`.


## options

*This rule takes no options*

## Passes

```jsx harmony
// passes when the label is hidden
<label aria-hidden="true"></label>

// passes when the label has a valid `htmlFor` prop
<label for="foo"></label>

// passes when it is not a label
<div></div>
```

## Fails

```jsx harmony
// fails when a label is not hidden and has no `htmlFor`
<label></label>
```

## See also

 - [This document](https://www.w3.org/WAI/tutorials/forms/labels) from w3.org
