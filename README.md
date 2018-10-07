React A11y
==========

[![build status](https://img.shields.io/travis/reactjs/react-a11y/master.svg?style=flat-square)](https://travis-ci.org/reactjs/react-a11y)

Warns about potential accessibility issues with your React elements.

![screenshot](http://i.imgur.com/naQTETB.png)


## Installation

Run:

```bash
npm install react-a11y
```

## Usage

In your main application file, require the module and call it, you'll start
getting warnings in the console as your app renders.  Note that by default all
rules are turned `off` so you need to turn them on first (by setting them to
`"warn"` or `"error"`).

```javascript
import React    from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV === 'development') {
  const a11y = require('react-a11y').default;
  a11y(React, ReactDOM, {
    rules: {
      'img-uses-alt': 'warn',
      'redundant-alt': [ 'warn', [ 'image', 'photo', 'foto', 'bild' ]]
    // ...
    }
  });
}
```

You probably don't want to call it if you're in production, since it patches the 
React rendering functions and this might make this slower.

## Options

These are the supported configuration options, annotated using [flow][] type
annotations

```flow js
a11y(React : React, ReactDOM : ReactDOM, opts : object? );
```

`React` is the React object you want to shim to allow the 
accessibility tests.

`ReactDOM` is the ReactDOM object you're using to render the
React components. This is only used on the client side, so you
can safely omit it when using `react-a11y` in node.

### `options`:
  - `plugins : [string]`
    An array of strings corresponding to names of plugins to be used.
    Eg. if the array contains `'aria-wai'` it would include the rules 
    in a (yet to be written) `react-a11y-plugin-aria-wai` module.  You
    are responsible for installing this module.

  - `rules : object`
    The configuration options for each of the rules. This uses the same format
    as [eslint][] does: 
    
    ```javascript
    const rules = {
      'img-uses-alt': 'off',
      'redundant-alt': [
        'warn',
        // other options to pass to the rule:
        [
          'foto'
        ]
      ]
    };
    ```
    
    Refer to the [rule docs](docs/rules) 
    to see what options are defined for each rule.

  - `reporter : object => undefined`
    Use this to modify how the warnings are displayed.
    The reporter is a function that accepts an object with
    the following keys:
    - `msg : string` - the error message
    - `tagName : string` - the tagName of the violating element (eg. `'img'`)
    - `severity : string` - the severity as configured by the user in the 
      corresponding rule configuration (one of `'off'`, `'warn'`, or `'error'`)
    - `props : object` - the props as passed to the element
    - `displayName : string?` - the `displayName` of the owner, if any
    - `DOMNode : object?` - the violating DOMNode as rendered to the browser
      DOM, this is only available on when `react-a11y` is running in the
      browser.
    - `url : string?` - The url to a webpage explaining why this rule
      is important

    The default reporter displays all the information it can, but listens
    to the deprecated options `includeSrcNode`, `warningPrefix` and
    `throwErro` and `throwError`.

  - `filterFn : (string, string, string) => boolean`
    You can filter failures by passing a function to the `filterFn` option. The
    filter function will receive three arguments: the name of the Component
    instance or ReactElement, the id of the violating element, and the failure
    message.

    Note: If it is a ReactElement, the name will be the node type (eg. `div`)

    ```javascript
    // only show errors on CommentList
    const commentListFailures = function (name, id, msg) {
      return name === "CommentList";
    };

    a11y(React, ReactDOM, { filterFn: commentListFailures });
    ```

## Cleaning Up In Tests

Use the `restoreAll()` method to clean up mutations made to `React`.
Useful if you are using `react-a11y` in your test suite:

```javascript
beforeEach(() => a11y(React));
afterEach(() => a11y.restoreAll());
```

## Writing plugins

The rules in this version of `react-a11y` are pluggable!
You can write your own plugin to add more rules.  Have a look at 
[writing plugins](docs/plugins.md) in the
docs to get started!

## Contributing

Interested in contributing?  Great!  Look here for more info: [CONTRIBUTING.md](CONTRIBUTING.md).

[react-a11y]:    https://github.com/reactjs/react-a11y
[eslint]:        http://eslint.org
[flow]:          http://flowtype.org
[eslint-plugin]: https://github.com/evcohen/eslint-plugin-jsx-a11y
[AX]:            https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules
