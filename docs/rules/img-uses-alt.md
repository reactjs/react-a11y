# img-uses-alt


Enforce that an `img` element contains the `alt` prop. The `alt` attribute specifies
an alternate text for an image, if the image cannot be displayed.


## Options

*This rule takes no options*

## Passes

These elements are passed by this rule
```js
// no problem when the img has an `alt`
<img src="foo" alt="nice"/>

// no problem when the img has an empty `alt` and role="presentation"
<img src="foo" alt="" role="presentation"/>

// no problem when the img is aria-hidden
<img src="foo" aria-hidden="true"/>
```

## Fails

These elements are *not* passed by this rule
```js
// warns when the img doen't have an `alt`
<img src="foo"/>

// warns when the img has alt="" but no role="presentation"
<img src="foo" alt=""/>
```

## See also

 - [This document](https://dev.w3.org/html5/alt-techniques)
 - [This document](https://www.w3.org/TR/wai-aria/roles#presentation)