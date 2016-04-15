# mouse-events-map-to-key-events


Enforce `onMouseOver`/`onMouseOut` are accompanied by
`onFocus`/`onBlur`. Coding for the keyboard is important for users with
physical disabilities who cannot use a mouse, AT compatability, and screenreader
users.


## Options

*This rule takes no options*

## Passes

These elements are passed by this rule
```js
// no problem when there is no `onMouseOver` or `onMouseOut`
<div></div>

// no problem when there is `onMouseOver` but and `onFocus`
<div></div>

// no problem when there is `onMouseOut` but and `onBlur`
<div></div>
```

## Fails

These elements are *not* passed by this rule
```js
// warns when there is `onMouseOver` but no `onFocus`
<div></div>

// warns when there is `onMouseOut` but no `onBlur`
<div></div>
```

## See also

 - [This document](http://webaim.org/techniques/javascript/eventhandlers#onmouseover)
 - [This document](http://webaim.org/techniques/javascript/eventhandlers#onmouseover)