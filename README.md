React A11y
==========

[![build status](https://img.shields.io/travis/rackt/react-a11y/master.svg?style=flat-square)](https://travis-ci.org/rackt/react-a11y)

Warns about potential accessibility issues with your React elements.

![screenshot](http://i.imgur.com/naQTETB.png)

WIP
---

This is a WIP, feel free to explore, open issues, and suggest assertions :)

Installation
------------

`npm install react-a11y`

Usage
-----

In your main application file, require and call the module, you'll start
getting warnings in the console as your app renders.

```js
var a11y = require('react-a11y');
if (ENV === 'development') a11y(React);
```

You probably don't want to call it if you're in production, and better
yet, alias the module to nothing with webpack in production.

If you want it to throw errors instead of just warnings:

```
a11y(React, { throw: true });
```

You can filter failures by passing a function to the `filterFn` option. The
filter function will receive three arguments: the name of the Component
instance or ReactElement, the id of the element, and the failure message.
Note: If a ReactElement, the name will be the node type followed by the id
(e.g. div#foo).

```
var commentListFailures = (name, id, msg) => {
  return name === "CommentList";
};

a11y(React, { filterFn: commentListFailures });
```

If you want to log DOM element references for easy lookups in the DOM inspector,
use the `includeSrcNode` option.

```
a11y(React, { throw: true, includeSrcNode: true });
```

Some test are only relevant for certain device types. For example,
if you are building a mobile web app, you can filter out
desktop-specific rules by specifying a specific device type:

```
a11y(React, { device: ['mobile'] });
```

It's also possible exclude certain tests:

```
a11y(React, { exclude: ['REDUNDANT_ALT'] });
```