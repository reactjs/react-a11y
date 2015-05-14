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
a11y(React, {throw: true});
```
