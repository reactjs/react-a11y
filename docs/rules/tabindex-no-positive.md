# tabindex-no-positive

It is recommended that authors avoid positive values for the `tabindex` attribute because it is 
brittle (any focusable elements added to the page without an explicit `tabindex` value greater than 
zero will come last in the tab order) and can easily result in a page which is extremely difficult 
to navigate, causing accessibility problems.  Only use a `tabindex` of 0 for focusable elements.


## options

*This rule takes no options*

## Passes

```jsx harmony
<div tabIndex={0} />
<div tabIndex="0" />
<div tabIndex="-1" />
```

## Fails

```jsx harmony
<div tabIndex={1} />
<div tabIndex="1" />
<div tabIndex="2" />
```

## See also

 - [This document](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_03) 
 from Chrome Accessibility Developer Tools.
