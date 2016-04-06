React A11y
==========

[![build status](https://img.shields.io/travis/reactjs/react-a11y/master.svg?style=flat-square)](https://travis-ci.org/reactjs/react-a11y)

Warns about potential accessibility issues with your React elements.

![screenshot](http://i.imgur.com/naQTETB.png)

## WIP

This is a WIP, feel free to explore, open issues, and suggest assertions :)

## Installation

Run:

```sh
npm install react-a11y
```

I want to prevent creating a new `npm` package for the fork, to reduce
confusion and ease possible merging of the forks. However, if there is
enough interest, I will probably do it anyway.

## Usage

In your main application file, require and call the module, you'll start
getting warnings in the console as your app renders.

```js
if (ENV === 'development') {
  const a11y = require('react-a11y').default
  a11y(React)
}
```

You probably don't want to call it if you're in production.

## Options

```js
a11y(React : React, opts : object? )
```

`React` is the React object you want to shim to allow the 
accessibility tests.

### `options`

#### `throw : boolean`
If you want it to throw errors instead of just warnings:

```
a11y(React, { throw: true })
```

#### `filterFn : (string, string, string) => boolean`
You can filter failures by passing a function to the `filterFn` option. The
filter function will receive three arguments: the name of the Component
instance or ReactElement, the id of the element, and the failure message.

Note: If a ReactElement, the name will be the node type (eg. `div`)

```js
// only show errors on CommentList
const commentListFailures = function (name, id, msg) {
  return name === "CommentList";
}

a11y(React, { filterFn: commentListFailures });
```

#### `includeSrcNode : boolean`

If you want to log DOM element references for easy lookups in the DOM inspector,
use the `includeSrcNode` option.  Because the lookup of the DOM nodes requires
`react-dom`, you must also pass that as an option:

```js
import ReactDOM from 'react-dom'
// ...
a11y(React, {
  includeSrcNode: true
, ReactDOM: ReactDOM
})
```

If you're using `react-a11y` on the server-side, always set `includeSrcNode` to
`false`.  The way DOM-lookups work is that they wait until everything is
rendered into the DOM and emit the warning after DOM update, but this doesn't happen
on the server-side, so no warnings will be shown.

#### `device : [ string ]`

Some test are only relevant for certain device types. For example,
if you are building a mobile web app, you can filter out
desktop-specific rules by specifying a specific device type:

```js
a11y(React, {
  device: ['mobile']
})
```

#### `exclude : [string]`

It's also possible exclude certain tests:

```js
a11y(React, {
  exclude: ['REDUNDANT_ALT']
})
```


## Cleaning Up In Tests

Use the `restoreAll()` method to clean up mutations made to `React`.
Useful if you are using `react-a11y` in your test suite:

```js
beforeEach(() => a11y(React))
afterEach(() => a11y.restoreAll())
```

[react-a11y]: https://github.com/reactjs/react-a11y
[eslint]:     http://eslint.org

