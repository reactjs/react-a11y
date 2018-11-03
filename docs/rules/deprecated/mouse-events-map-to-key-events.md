# mouse-events-map-to-key-events (deprecated - use mouse-events-have-key-events)

Enforce `onMouseOver`/`onMouseOut` are accompanied by
`onFocus`/`onBlur`. Coding for the keyboard is important for users with
physical disabilities who cannot use a mouse, AT compatibility, and screenreader
users.


## options

*This rule takes no options*

## Passes

```jsx harmony
// passes when there is no `onMouseOver` or `onMouseOut`
<div></div>

// passes when there is `onMouseOver` and `onFocus`
<div onMouseOver={someFunction} onFocus={someFunction}></div>

// passes when there is `onMouseOut` and `onBlur`
<div onMouseOut={someFunction} onBlur={someFunction}></div>
```

## Fails

```jsx harmony
// fails when there is `onMouseOver` but no `onFocus`
<div onMouseOver={someFunction}></div>

// fails when there is `onMouseOut` but no `onBlur`
<div onMouseOut={someFunction}></div>
```

## See also

 - [This document](http://webaim.org/techniques/javascript/eventhandlers#onmouseover) from webaim.org
 - [This document](http://webaim.org/techniques/javascript/eventhandlers#onmouseover) from webaim.org
