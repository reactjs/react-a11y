# button-role-space


Enforce that elements which have the `role="button"`
also have an `onKeyDown` handler that handles Space or Enter
(this is isn't actually checked) for poeple that are using a
keyboard-only device.


## Options

*This rule takes no options*

## Passes

These elements are passed by this rule
```js
// no problem when role="button" but there is an onKeyDown handler.
<div role="button"></div>

// no problem when there is no role
<div></div>

// no problem when there the role is not button
<div role="foo"></div>

// no problem when the element is aria-hidden
<div aria-hidden="true" role="button"></div>
```

## Fails

These elements are *not* passed by this rule
```js
// warns when role="button" and no `onKeyDown` is present
<div role="button"></div>
```

## See also

 - [This document](https://www.w3.org/WAI/GL/wiki/Making_actions_keyboard_accessible_by_using_keyboard_event_handlers_with_WAI-ARIA_controls