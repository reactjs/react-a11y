React A11y
==========

Warns about potential accessibility issues with your React elements.

__This is a fork of [`reactjs/react-a11y`][react-a11y], that didn't seem to get
the love it deserves.__

The original repo had a lot of open issues and unmerged pull requests.
Eventually, I would like to see all code merged back into the original!

To see what's changed, look at [Differences from
`react-a11y`](#differences-from-upstream-react-a11y).

## `next`

This is the `next` branch, that moves away from the API in the upstream
`reactjs/react-a11y`.  The API will be different, transition between API's is
made  as smooth as possible by adding deprecation warnings and building the new
defaults on top of the old API.

## Installation

Run:

```sh
npm install romeovs/react-a11y@next
```

I want to prevent creating a new `npm` package for the fork, to reduce
confusion and ease possible merging of the forks. However, if there is
enough interest, I will probably do it anyway.

## Usage

In your main application file, require and call the module, you'll start
getting warnings in the console as your app renders.

```js
import React    from 'react'
import ReactDOM from 'react-dom'

if (ENV === 'development') {
  const a11y = require('react-a11y').default
  a11y(React, ReactDOM, {
    // options
  })
}
```

You probably don't want to call it if you're in production, since it patches the 
React rendering functions and this might make this slower.

## Options

These are the supported configuration options, annotated using [flow][] type
annotations

```js
a11y(React : React, ReactDOM : ReactDOM, opts : object? )
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
    ```js
    const rules = {
      'img-uses-alt': 'off'
    , 'label-uses-for': [
        'warn', // other options to pass to the rule
      ]
    }

    ```

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
    `throwErro and `throwError`.

  - `filterFn : (string, string, string) => boolean`
    You can filter failures by passing a function to the `filterFn` option. The
    filter function will receive three arguments: the name of the Component
    instance or ReactElement, the id of the violating element, and the failure
    message.

    Note: If it is a ReactElement, the name will be the node type (eg. `div`)

    ```js
    // only show errors on CommentList
    const commentListFailures = function (name, id, msg) {
      return name === "CommentList";
    }

    a11y(React, ReactDOM, { filterFn: commentListFailures });
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

  - The API is totally different on this branch.  It has a simple plugin system
    so other poeple can write and publish their own rules.  The options have
    become much simpler also.
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

  - [x] add a build-step that mirrors changes in code-style such as
    increased use of ES6 features.
  - [x] add [`eslint`][eslint] config so poeple can collaborate
    more easy.
  - [ ] put up a travis worker to make merging easier.
  - [ ] write docs about how to write plugins.
  - [ ] implement all the rules that are in upstream and in
    `eslint-plugin-jsx-a11y`.
    - [x] `img-uses-alt` (`MISSING_ALT`)
    - [x] `label-uses-for`
    - [x] `mouse-events-map-to-key-events`
    - [x] `no-access-key`
    - [x] `no-hash-ref`
    - [x] `onclick-uses-role` (`NO_ROLE`)
    - [x] `onclick-uses-tabindex` (`NO_TABINDEX`)
    - [x] `redundant-alt`
    - [x] `use-onblur-not-onchange`
    - [ ] `valid-aria-role`
    - [x] `button-role-space` (`BUTTON_ROLE_SPACE`)
    - [ ] `button-role-enter` (`BUTTON_ROLE_ENTER`)
    - [ ] `tabindex-required-when-aria-hidden`
    - [ ] `hash-href-needs-button`
    - [ ] `tabindex-needs-button`

## Plans

These are some plans I've dreamt up for `react-a11y`:

  - [x] **make rules pluggable like [eslint][eslint].**  It would be nice
    for everyone to be able to write their own rules and inject
    them into `react-a11y`.  First of all, this would mean less 
    maintenance for me, since poeple can build their own, and it 
    would make `react-a11y` a formidable validation tool.
  - [ ] **create a nice project page** with documentation, because
    that is what poeple like these days.
  - [ ] create filtering options based on rule outputs like `affects`

[react-a11y]: https://github.com/reactjs/react-a11y
[eslint]:     http://eslint.org
[flow]:       http://flowtype.org
