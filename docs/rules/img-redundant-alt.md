# img-redundant-alt

Enforce img alt attribute does not contain the word image, picture, or photo.
Screenreaders already announce `img` elements as an image. There is no need to use
words such as *image*, *photo*, and/or *picture*.


## options

This rule takes the following options:
  1.  Words to look for when looking for redundant words. (**Array(String)**)
      default: `["image","picture","photo"]`

## Passes

```jsx harmony
// passes when the `alt` does not contain redundant words
<img src="foo" alt="nice"/>

// passes when the `alt` does not contain redundant words (different opts)
// (using options: ["warn",["foto"]])
<img src="foo" alt="image"/>

// passes when the element is aria-hidden
<img src="foo" alt="nice" aria-hidden="true"/>
```

## Fails

```jsx harmony
// fails when is a redundant alt message
<img src="foo" alt="bar image foo"/>

// fails when is a redundant alt message (different opts)
// (using options: ["warn",["foto"]])
<img src="foo" alt="bar foto"/>
```

## See also

 - [This document](http://webaim.org/techniques/alttext) from webaim.org
