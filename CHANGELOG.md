v1.1.0 - Sat, 03 Nov 2018 14:08:56 GMT
--------------------------------------

- [c45ed13](../../commit/c45ed13) Fixed issue with ref props created with React.createRef()
- [9acfd3f](../../commit/9acfd3f) Added back in all of the previous rules that had been renamed with deprecation warnings to allow for a smoother transition for consuming applications.
- [72e593a](../../commit/72e593a) Remove babel-register from dependencies as this pulls in babel-core 6 which means that babel 7 can't be used cleanly
- [ce7f037](../../commit/ce7f037) Renamed and modified button-role-space to click-events-have-key-events to be more consistent with the rule in the the eslint-plugin-jsx-a11y library
- [3e9e4b5](../../commit/3e9e4b5) Renamed a number of rules that were equivalent to existing rules in the eslint-plugin-jsx-a11y library for consistency between the two libs
- [58e525f](../../commit/58e525f) Changed documentation reference to ENV to process.env.NODE_ENV
- [73c69e6](../../commit/73c69e6) Renamed rule avoid-positive-tabindex to tabindex-no-positive to be more inline with the rule naming in eslint-plugin-jsx-a11y
- [4bcb769](../../commit/4bcb769) Removed yarn from Travis yaml so npm will be used with package-lock.json and use npm ci
- [ba57e2e](../../commit/ba57e2e) Added package-lock.json and fixed npm audit findings
- [26b2772](../../commit/26b2772) Fixed a dead link pointing to the W3's aria role definitions document


v1.0.1 - Sat, 01 Sep 2018 15:53:33 GMT
--------------------------------------

- [d4b2256](../../commit/d4b2256) Changed the format of the reporter to use a default prefix of '[react-a11y]' to aid with identification and filtering in the console
- [6471b17](../../commit/6471b17) Updated Travis config to solve for issue with headless Chrome tests failing
- [5a08e10](../../commit/5a08e10) Add missing "o"
- [ee6a99e](../../commit/ee6a99e) docs: fix typos


v1.0.0 - Tue, 14 Nov 2017 12:19:00 GMT
-----------------------------------------

- [94573c1](../../commit/94573c1) Revamp the API and configuration to allow for more modular rules to be added. 

**API Changes:**

An options object can now be passed in to the `a11y()` function where you can specify a rules configuration, a 
reporter function allowing modification of how warnings are displayed, a filter function for filtering all failures,
and finally a plugins array listing the names of any plugin modules to be used.  
See [Usage](../README.md#usage) for details.

**Plugins!**

react-a11y is now pluggable!  See [writing plugins](docs/plugins.md) to learn how to write your own plugin.


v0.3.6 - Thu, 12 Oct 2017 12:50:02 GMT
-------------------------------------

- [b8f4e58](../../commit/b8f4e58) Update ReactDOM for react v16 compatibility


v0.3.5 - Tue, 30 May 2017 14:23:58 GMT
-----------------------------------------

- [a7eb16f](../../commit/a7eb16f) Fixed [#16](https://github.com/romeovs/react-a11y/issues/16) inappropriately referencing this in a context where this is actually undefined.


v0.3.4 - Sun, 30 Apr 2017 20:48:28 GMT
--------------------------------------

- [e41ba68](../../commit/e41ba68) Fixed [#11](https://github.com/romeovs/react-a11y/issues/11) from being too strict testing for use-onblur-not-onchange.  Now it should pass if onChange is used in addition to onBlur.
- [3173a1d](../../commit/3173a1d) Fixed [#10](https://github.com/romeovs/react-a11y/issues/10) where if a tagName is being checked for reserved in the DOM object but does not exist in the DOM object an exception was being thrown
- [d0401be](../../commit/d0401be) 1. Updated eslint and plugin versions 2. Added the AirBnB eslint config to inherit 3. Fixed all linter findings


v0.3.3 - Mon, 3 Apr 2017 23:01:39 GMT
--------------------------------------

- [d85328e](../../commit/d85328e) Added some more scripts for helping with the version and publish process and added descriptions of the scripts in the CONTRIBUTING.md
- [2ffa8ac](../../commit/2ffa8ac) Added a CONTRIBUTING page and linked to it from the README.
- [c715c45](../../commit/c715c45) Updated urls to point to this repo instead of the forked from repo
- [fa32346](../../commit/fa32346) Added the bundle script to the prepublish script so that the webpack bundle gets included in the npm package.  Also disabled the release script and removed the rf-release package as this does not seem to be tagging or publishing to npm properly.
- [8bff3fe](../../commit/8bff3fe) Added/removed dirs and files from npmignore
- [be6f51e](../../commit/be6f51e) Adding some tags! Added <svg> and <path>


v0.3.2 - Tue, 15 Mar 2016 00:16:50 GMT
--------------------------------------

- 


v0.3.1 - Wed, 09 Mar 2016 19:19:52 GMT
--------------------------------------

- [2e59bba](../../commit/2e59bba) [fixed] Move object.assign from devDeps to deps (resolves #115)


v0.3.0 - Tue, 08 Mar 2016 05:15:59 GMT
--------------------------------------

- [78eb833](../../commit/78eb833) [fixed] correctly accounting for aria-labelledby (resolves #99)
- [f43b546](../../commit/f43b546) [fixed] Spelling error
- [26afd1e](../../commit/26afd1e) [fixed] correctly accounting for aria-labelledby (resolves #87)
- [0e6bb84](../../commit/0e6bb84) [added] includeSrcNode takes "asString" as option.
- [2f5f942](../../commit/2f5f942) [added] warningPrefix option
- [bdc24df](../../commit/bdc24df) [added] "picture" to the list of redundant words in img[alt]
- [598c8f8](../../commit/598c8f8) [fixed] Label test should require a label for placeholder anchors (resolves #68) [fixed] Label assertion errors if label is a number (resolves #67)
- [4d1f885](../../commit/4d1f885) [fixed] bug where placeholder links required a tabindex and an ARIA role (closes #62) [fixed] bug where elements with role=none required a label (closes #63) [fixed] bug where elements with aria-hidden required a label (closes #64) [added] test to ensure interactive elements hidden using aria-hidden are removed from the tab flow
- [66aea56](../../commit/66aea56) [added] docs for excluding tests to the README (resolves #60)
- [8f2a22a](../../commit/8f2a22a) [fixed] bug where label assertion didn't account for the label being an image created by a custom component (resolves #52) [fixed] bug where label assertion wouldn't fail when none of the child Components have label text (resolves #53)
- [2c47c8d](../../commit/2c47c8d) [fixed] issue where elements with the presentation role required a label. resolves #50
- [8c6a7ce](../../commit/8c6a7ce) [fixed] bug where the label assertion can return a false failure #48
- [c4d52fc](../../commit/c4d52fc) [fixed] Issue where label assertion returns a false negative when label is inside a child Component (fixes #44) [added] Tests to ensure anchors with a tabIndex but without an href require an ARIA button role (fixes #45) [added] selection and option to the list of interactive elements that require labels [removed] getFailures() method since all failures are now logged asynchronously


v0.2.8 - Fri, 30 Oct 2015 17:01:59 GMT
--------------------------------------

- [78eb833](../../commit/78eb833) [fixed] correctly accounting for aria-labelledby (resolves #99)


v0.2.7 - Fri, 30 Oct 2015 15:46:37 GMT
--------------------------------------

- [f43b546](../../commit/f43b546) [fixed] Spelling error
- [26afd1e](../../commit/26afd1e) [fixed] correctly accounting for aria-labelledby (resolves #87)
- [0e6bb84](../../commit/0e6bb84) [added] includeSrcNode takes "asString" as option.
- [2f5f942](../../commit/2f5f942) [added] warningPrefix option
- [bdc24df](../../commit/bdc24df) [added] "picture" to the list of redundant words in img[alt]


v0.2.6 - Fri, 12 Jun 2015 22:28:58 GMT
--------------------------------------

- [598c8f8](../../commit/598c8f8) [fixed] Label test should require a label for placeholder anchors (resolves #68) [fixed] Label assertion errors if label is a number (resolves #67)


v0.2.5 - Thu, 11 Jun 2015 06:05:16 GMT
--------------------------------------

- [4d1f885](../../commit/4d1f885) [fixed] bug where placeholder links required a tabindex and an ARIA role (closes #62) [fixed] bug where elements with role=none required a label (closes #63) [fixed] bug where elements with aria-hidden required a label (closes #64) [added] test to ensure interactive elements hidden using aria-hidden are removed from the tab flow


v0.2.4 - Wed, 10 Jun 2015 20:33:32 GMT
--------------------------------------

- [66aea56](../../commit/66aea56) [added] docs for excluding tests to the README (resolves #60)


v0.2.3 - Wed, 10 Jun 2015 17:07:25 GMT
--------------------------------------

- [6f38fe8](../../commit/6f38fe8) [Added] Ability to exclude tests (resolves #57)


v0.2.2 - Tue, 09 Jun 2015 18:06:39 GMT
--------------------------------------

- [8f2a22a](../../commit/8f2a22a) [fixed] bug where label assertion didn't account for the label being an image created by a custom component (resolves #52) [fixed] bug where label assertion wouldn't fail when none of the child Components have label text (resolves #53)
- [2c47c8d](../../commit/2c47c8d) [fixed] issue where elements with the presentation role required a label. resolves #50


v0.2.1 - Mon, 08 Jun 2015 23:02:25 GMT
--------------------------------------

- [8c6a7ce](../../commit/8c6a7ce) [fixed] bug where the label assertion can return a false failure #48


v0.2.0 - Mon, 08 Jun 2015 19:27:33 GMT
--------------------------------------

- [c4d52fc](../../commit/c4d52fc) [fixed] Issue where label assertion returns a false negative when label is inside a child Component (fixes #44) [added] Tests to ensure anchors with a tabIndex but without an href require an ARIA button role (fixes #45) [added] selection and option to the list of interactive elements that require labels [removed] getFailures() method since all failures are now logged asynchronously


v0.1.1 - Thu, 21 May 2015 17:25:45 GMT
--------------------------------------

- [7c16747](../../commit/7c16747) Add filtering for different device types.


v0.1.0 - Thu, 21 May 2015 03:41:08 GMT
--------------------------------------

- [6475a4a](../../commit/6475a4a) Add a means of filtering failures on a per-component basis
- [9c0f970](../../commit/9c0f970) Add Travis build status
- [34533d7](../../commit/34533d7) Drop React from peerDependency and rely on passing it in
- [803325d](../../commit/803325d) Mark all failing tags with an ID and include it in the message
- [3af4d51](../../commit/3af4d51) Use Babel for prepublish
- [870237a](../../commit/870237a) Ensure elements with a tabIndex is set to 0 are considered interactive
- [069ab87](../../commit/069ab87) Add support for React 0.13. Switch from 6to5 to Babel
- [e7d1373](../../commit/e7d1373) Skip processing props that are null or undefined
- [b6f1d81](../../commit/b6f1d81) Ensure buttons have onKeyDown event listeners that trigger a click event for Spacebar and Enter keys


v0.0.6 - Wed, 25 Feb 2015 16:47:21 GMT
--------------------------------------

-


v0.0.5 - Wed, 28 Jan 2015 19:37:34 GMT
--------------------------------------

-


v0.0.4 - Mon, 19 Jan 2015 15:57:06 GMT
--------------------------------------

- [3b7f988](../../commit/3b7f988) [fixed] missing interactive tags


v0.0.3 - Mon, 19 Jan 2015 15:36:02 GMT
--------------------------------------

- [2d0c081](../../commit/2d0c081) [added] ability to throw instead of warn


v0.0.2 - Mon, 19 Jan 2015 15:23:50 GMT
--------------------------------------

- [109bd94](../../commit/109bd94) [added] button role but no keydown handler


v0.0.1 - Mon, 19 Jan 2015 07:50:25 GMT
--------------------------------------

-
