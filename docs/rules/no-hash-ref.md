# no-hash-ref


Enforce an anchor element's href prop value is not just `"#"`. You should use
something more descriptive, or use a button instead.


## Options

*This rule takes no options*

## Passes

These elements are passed by this rule
```js
// no problem when the `href` is not `#`
<a href="foo#bar"></a>
```

## Fails

These elements are *not* passed by this rule
```js
// warns when the `href` is `#`
<a href="#"></a>
```

## See also

 - [This document](http://webaim.org/techniques/hypertext/