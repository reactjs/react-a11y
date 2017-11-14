
# Writing plugins

Writing a plugin is really simple.

All you need to expose in your entry point is an object with the
following format:

```js
export default {
  rules: {
    'rule-name': // rule definition
  , 'other-rule-name': // other rule definitions...
  }
}
```
And publish that as a package `react-a11y-plugin-{plugin-name}`.

The rules will be accessible to for configuration by the end-user as:

```js
{
  plugins: [
     // ...
    '{plugin-name}'
  ]
, rules: {
    'plugin-name/rule-name': [ 'warn', /* other options */ ]
  , 'plugin-name/other-rule-name': 'off'
  }
}
```

A rule definition is an array of tests, where each test looks like:
```js
{
  msg: 'This is the error message explaining what is wrong'
, affects: [
    // this is an array of affected devices, undefined means all devices
    // eg. A11y.devices.screenReaders
  ]

, test (tagName, props, children, ctx) {
    // this test returns true if an element passes, false if otherwise
    // ctx contains: React, ReactDOM, and the options passed to the test
  }

, tagName: 'img' // a string or array of strings with the element names 
                 // which this test applies to (undefined means all elements)

, url: 'http://www.w3.org/article-that/explains/it-all'
, AX:  'AX_ARIA_02' // the google chrome accessibility code (if applicable)
}
```

The affected devices array is not used for the moment but will be in the future
so users can filter based on them.  The possible devices are available in:

```
require('react-a11y/util').devices
// == {
//   screenReaders: ...
// , keyboardOnly:  ...
// }
```

Look at [the rules included in `react-a11y`](../src/rules) for examples.
