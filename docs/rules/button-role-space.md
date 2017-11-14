# button-role-space

Enforce that elements which have the `role="button"`
also have an `onKeyDown` handler that handles Space or Enter
(this is isn't actually checked) for poeple that are using a
keyboard-only device.


## options

*This rule takes no options*

## Passes

```js
// passes when role="button" but there is an onKeyDown handler.
<div role="button"></div>

// passes when there is no role
<div></div>

// passes when there the role is not button
<div role="foo"></div>

// passes when the element is aria-hidden
<div aria-hidden="true" role="button"></div>
```

## Fails

```js
// fails when role="button" and no `onKeyDown` is present
<div role="button"></div>
```

## See also

 - [This document](https://www.w3.org/WAI/GL/wiki/Making_actions_keyboard_accessible_by_using_keyboard_event_handlers_with_WAI-ARIA_controls) from w3.org
