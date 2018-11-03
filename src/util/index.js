export { default as isInteractive } from './is-interactive';
export { default as hiddenFromAT } from './hidden-from-at';
export { default as listensTo } from './listens-to';
export { default as trueish } from './trueish';
export { default as hasProp } from './has-prop';
export { default as aria } from './aria';
export { default as DOM } from './DOM';
export { default as role } from './role';
export { default as browser } from './browser';

export const devices = {
    screenReaders: Symbol('screenReaders'),
    keyboardOnly: Symbol('keyboardOnly'),
    mobile: Symbol('mobile')
};

// simple callback
export const fn = () => null;

// builds url for specific google AX Rule
export const AXURL = ax => `https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#${ax}`;

export const warnRuleDeprecated = (currentRule, newRule) =>
    console.warn(`[react-a11y]: Warning: the rule ${currentRule} is deprecated.  Use the rule ${newRule} instead.`);
