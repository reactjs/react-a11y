# mouse-events-map-to-key-events

Enforce `onMouseOver`/`onMouseOut` are accompanied by
`onFocus`/`onBlur`. Coding for the keyboard is important for users with
physical disabilities who cannot use a mouse, AT compatibility, and screenreader
users.


## options

*This rule takes no options*

## Passes

```js
// passes when there is no `onMouseOver` or `onMouseOut`
<div></div>

// passes when there is `onMouseOver` but and `onFocus`
<div></div>

// passes when there is `onMouseOut` but and `onBlur`
<div></div>
```

## Fails

```js
// fails when there is `onMouseOver` but no `onFocus`
<div></div>

// fails when there is `onMouseOut` but no `onBlur`
<div></div>
```

## See also

 - [This document](http://webaim.org/techniques/javascript/eventhandlers#onmouseover) from webaim.org
 - [This document](http://webaim.org/techniques/javascript/eventhandlers#onmouseover) from webaim.org
