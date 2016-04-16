# no-hash-ref

Enforce an anchor element's href prop value is not just `"#"`. You should use
something more descriptive, or use a button instead.


## options

*This rule takes no options*

## Passes

```js
// passes when the `href` is not `#`
<a href="foo#bar"></a>
```

## Fails

```js
// fails when the `href` is `#`
<a href="#"></a>
```

## See also

 - [This document](http://webaim.org/techniques/hypertext/) from webaim.org
