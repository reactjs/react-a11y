v0.2.3 - Wed, 10 Jun 2015 17:07:25 GMT
--------------------------------------

- 


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