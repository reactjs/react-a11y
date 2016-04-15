# hidden-uses-tabindex


Enforce that interactive elements that have been removed from
the accessibility tree usign `aria-hidden` are also removed from
the tab flow by setting `tabIndex={-1}`.  If not, this could result
in a hidden tab stop for screen reader users.


## Options

*This rule takes no options*

## Passes

These elements are passed by this rule
```js
// no problem when an interactive element is aria-hidden and has tabindex="-1"
<input aria-hidden="true" tabindex="-1"/>

// no problem when the element is not interactive
<div aria-hidden="true"></div>

// no problem when an interactive element is not aria-hidden
<input/>
```

## Fails

These elements are *not* passed by this rule
```js
// warns when an interactive element is hidden but has no tabindex
<input aria-hidden="true"/>

// warns when an interactive element is hidden but has a bad tabindex
<input aria-hidden="true" tabindex="2"/>
```

## See also

 - [This document](http://john.foliot.ca/aria-hidden