# button-role-space (deprecated - use click-events-have-key-events)

Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, 
onKeyPress. Coding for the keyboard is important for users with physical disabilities 
who cannot use a mouse, AT compatibility, and screenreader users.


## options

*This rule takes no options*

## Passes

```jsx harmony
// passes when there is an `onClick` handler and there is an `onKey*` handler.
<div onClick={fn} onKeyDown={this.handleKeyDown} />
<div onClick={fn} onKeyUp={this.handleKeyUp} />
<div onClick={fn} onKeyPress={this.handleKeyPress} />

// passes when the element is aria-hidden
<div onClick={fn} aria-hidden="true"></div>
```

## Fails

```jsx harmony
// fails when there is an `onClick` handler and no `onKey*` is present
<div onClick={fn}></div>
```

## See also

 - [This document](https://www.w3.org/WAI/GL/wiki/Making_actions_keyboard_accessible_by_using_keyboard_event_handlers_with_WAI-ARIA_controls) from w3.org
