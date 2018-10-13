# hidden-uses-tabindex

Enforce that interactive elements that have been removed from
the accessibility tree using `aria-hidden` are also removed from
the tab flow by setting `tabIndex={-1}`.  If not, this could result
in a hidden tab stop for screen reader users.


## options

*This rule takes no options*

## Passes

```jsx harmony
// passes when an interactive element is aria-hidden and has tabindex="-1"
<input aria-hidden="true" tabindex="-1"/>

// passes when the element is not interactive
<div aria-hidden="true"></div>

// passes when an interactive element is not aria-hidden
<input/>
```

## Fails

```jsx harmony
// fails when an interactive element is hidden but has no tabindex
<input aria-hidden="true"/>

// fails when an interactive element is hidden but has a bad tabindex
<input aria-hidden="true" tabindex="2"/>
```

## See also

 - [This document](http://john.foliot.ca/aria-hidden) from john.foliot.ca
