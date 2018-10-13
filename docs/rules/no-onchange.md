# no-onchange

Enforce usage of onBlur over onChange for accessibility. onBlur must be used
instead of onChange, unless absolutely necessary and it causes no negative
consequences for keyboard only or screen reader users.


## options

*This rule takes no options*

## Passes

```jsx harmony
// passes when there is no `onChange` prop
<input/>

// passes when the element is aria-hidden
<input onChange={fn} aria-hidden="true"/>

// passes when the element is aria-disabled
<input onChange={fn} aria-disabled="true"/>

// passes when the element is aria-readonly
<input onChange={fn} aria-readonly="true"/>

// passes when there is an `onChange` prop and an `onBlur` prop
<input onChange={fn} onBlur={fn}/>
```

## Fails

```jsx harmony
// fails when the `onChange` prop is present without an `onBlur` prop
<input onChange={fn}/>
```

## See also

 - [This document](http://webaim.org/techniques/javascript/eventhandlers#onchange) from webaim.org
