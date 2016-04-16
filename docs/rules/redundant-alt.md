# redundant-alt


Enforce img alt attribute does not contain the word image, picture, or photo.
Screenreaders already announce `img` elements as an image. There is no need to use
words such as *image*, *photo*, and/or *picture*.


## Options

This rule takes the following options
  1.  Words to look for when looking for redudant words. (**Array(String)**)
      default: `["image","picture","photo"]`

## Passes

These elements are passed by this rule
```js
// no problem when the `alt` does not contain redundant words
<img src="foo" alt="nice"/>

// no problem when the `alt` does not contain redundant words (different opts)
<img src="foo" alt="image"/>

// no problem when the element is aria-hidden
<img src="foo" alt="nice" aria-hidden="true"/>
```

## Fails

These elements are *not* passed by this rule
```js
// warns when is a redundant alt message
<img src="foo" alt="bar image foo"/>

// warns when is a redundant alt message (different opts)
<img src="foo" alt="bar foto"/>
```

## See also

 - [This document](http://webaim.org/techniques/alttext)