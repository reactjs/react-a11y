React A11y
==========

[![build status](https://img.shields.io/travis/reactjs/react-a11y/master.svg?style=flat-square)](https://travis-ci.org/reactjs/react-a11y)

Warns about potential accessibility issues with your React elements.

__This is a fork of [`reactjs/react-a11y`][react-a11y], that didn't seem to get
the love it deserves.__

The original repo had a lot of open issues and unmerged pull requests.
Eventually, I would like to see all code merged back into the original!

To see what's changed, look at [Differences from
`react-a11y`](#differences-from-upstream-react-a11y).

## WIP

This is a WIP, feel free to explore, open issues, and suggest assertions :)

## Installation

Run:

```sh
npm install romeovs/react-a11y
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

```js
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

## Differences from upstream [`react-a11y`][react-a11y]

I will try to stay close to the upstream `react-a11y` API,
and document differences here.

  - To use `includeSrcNode`, one __must__ pass `ReactDOM` as
    well.  `a11y` will throw an error if you don't do this.
    This is because I want to move away from pre-`0.14` React.
  - Started using `ReactDOM.finDOMNode` instead of `document.getElementById`, as
    noted in upstream [#54](https://github.com/reactjs/react-a11y/issues/54).
    This fixes a lot of issues from upstream:
    - [#54](https://github.com/reactjs/react-a11y/issues/54) Use
      React.findDOMNode to log element references
    - [#55](https://github.com/reactjs/react-a11y/issues/55) Consider using ref
      to log element references when there is a warning
    - [#77](https://github.com/reactjs/react-a11y/issues/77) Breaks pure-render
      checks
    - [#85](https://github.com/reactjs/react-a11y/issues/85) Different
      react-a11y ids (server side render)
  - Fixed upstream issue [#102](https://github.com/reactjs/react-a11y/issues/102)
    by correctly inferring the component instance.
  - Removed depency on `object.assign`

## TO DO

These are things I need to do in the short run to make the project
usable:

  - [ ] add a build-step that mirrors changes in code-style such as
    increased use of ES6 features.
  - [ ] add [`eslint`][eslint] config so poeple can collaborate
    more easy.

## Plans

These are some plans I've dreamt up for `react-a11y`:

  - [ ] **make rules pluggable like [eslint][eslint].**  It would be nice
    for everyone to be able to write their own rules and inject
    them into `react-a11y`.  First of all, this would mean less 
    maintenance for me, since poeple can build their own, and it 
    would make `react-a11y` a formidable validation tool.
  - [ ] **create a nice project page** with documentation, because
    that is what poeple like these days.
  - [ ] move away from global variables in modules, everything is lamda.
    This would make some bugs less likely.


[react-a11y]: https://github.com/reactjs/react-a11y
[eslint]:     http://eslint.org

