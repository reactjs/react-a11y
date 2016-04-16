# use-onblur-not-onchange


Enforce usage of onBlur over onChange for accessibility. onBlur must be used
instead of onChange, unless absolutely necessary and it causes no negative
consequences for keyboard only or screen reader users.


## Options

*This rule takes no options*

## Passes

These elements are passed by this rule
```js
// no problem when there is no `onChange` prop
<input/>

// no problem when the element is aria-hidden
<input aria-hidden="true"/>

// no problem when the element is aria-disabled
<input aria-disabled="true"/>

// no problem when the element is aria-readonly
<input aria-readonly="true"/>
```

## Fails

These elements are *not* passed by this rule
```js
// warns when the `onChange` prop is present
<input/>
```

## See also

 - [This document](http://webaim.org/techniques/javascript/eventhandlers#onchange)