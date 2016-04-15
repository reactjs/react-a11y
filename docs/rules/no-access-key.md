# no-access-key


Enforce no accessKey prop on element. Access keys are HTML elements that allow
web developers to assign keyboard shortcuts to elements.  Inconsistencies between
keyboard shortcuts and keyboard commands used by screenreader and keyboard only
users create accessibility complications so to avoid complications, access keys
should not be used.


## Options

*This rule takes no options*

## Passes

These elements are passed by this rule
```js
// no problem when there is an no `accessKey` prop
<div></div>
```

## Fails

These elements are *not* passed by this rule
```js
// warns when there is an `accessKey` prop
<div accesskey="a"></div>
```

## See also

 - [This document](http://webaim.org/techniques/keyboard/accesskey#spec)