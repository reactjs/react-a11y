# use-onblur-not-onchange

Enforce usage of onBlur over onChange for accessibility. onBlur must be used
instead of onChange, unless absolutely necessary and it causes no negative
consequences for keyboard only or screen reader users.


## options

*This rule takes no options*

## Passes

```js
// passes when there is no `onChange` prop
<input/>

// passes when the element is aria-hidden
<input aria-hidden="true"/>

// passes when the element is aria-disabled
<input aria-disabled="true"/>

// passes when the element is aria-readonly
<input aria-readonly="true"/>
```

## Fails

```js
// fails when the `onChange` prop is present
<input/>
```

## See also

 - [This document](http://webaim.org/techniques/javascript/eventhandlers#onchange) from webaim.org
