/* eslint-disable babel/new-cap,no-console */
import {
    browser,
    AXURL
} from './util';

const LOG_PREFIX = '[react-a11y]:';

/**
 * Throws an error based on the warning
 * If the last argument is a DOM node, it
 * coerces it to a string before throwing.
 * @returns {undefined}
 */
const throwError = (...args) => {
    const last = args[args.length - 1];
    if (last.outerHTML) {
        args[args.length - 1] = `Element: \n  ${last.outerHTML}`;
    }

    const error = new Error(args.join(' '));
    error.element = last;

    throw error;
};

/**
 * Show a warning
 * @returns {undefined}
 */
const showWarning = (...args) => {
    if (browser) {
        console.warn(...args);
    } else {
        console.warn(args.join('\n  '));
    }
};

/**
 * Creates a reporter function based on deprecated options
 * @arg {object} opts - The options passed by the user
 * @returns {function} The reporter
 */
const mkReporter = (opts) => {
    const {
        doThrow = false,
        warningPrefix = LOG_PREFIX
    } = opts;

    return (info) => {
        const {
            msg,
            displayName,
            DOMNode,
            url,
            tagName,
            severity,
            AX
        } = info;

        // build warning
        const warning = [
            warningPrefix,
            `${displayName || tagName} - ${msg}`,
            ...(url ? [`See '${url}' for more info.`] : []),
            ...(AX ? [`See '${AXURL(AX)}' for more info.`] : []),
            DOMNode || tagName
        ];

        if (doThrow || severity === 'error') {
            throwError(...warning);
        } else {
            showWarning(...warning);
        }
    };
};

/**
 * Generate a deprecation warning when a key is present
 * in the options object
 * @arg {object} opts - the options object under scrutiny
 * @arg {string} name - the name of the deprecated option
 * @arg {string} msg  - an optional reason for the deprecation
 * @returns {undefined}
 */
const deprecate = (opts, name, msg = '') => {
    if (name in opts) {
        console.warn(`${LOG_PREFIX} the \`${name}\` options is deprecated. ${msg}`);
    }
};

/**
 * Make a certain option mandatory
 * @arg {object} opts - the options object under scrutiny
 * @arg {string} name - the name of the mandatory option
 * @arg {string} msg  - an optional reason
 * @returns {undefined}
 */
const mandatory = (opts, name, msg = '') => {
    if (!(name in opts)) {
        throw new Error(`${LOG_PREFIX} the \`${name}\` option is mandatory. ${msg}`);
    }
};

// always resolve to true
const always = () => true;

// deprecation message
const msg = 'Use the `reporter` option to change how warnings are displayed.';

/**
 * Normalize and validate the options that the user passed in.
 * @arg {object} opts - The opts the user passed in
 * @returns {object} the validated options
 */
export default function (...args) {
    // signature is a11y(React, opts) or a11y(React, ReactDOM, opts)
    // so destructure args based on number of args passed
    let props = [];
    if (args.length === 2) {
        if (args[1].findDOMNode === undefined) {
            props = [args[0], null, args[1] || {}];
        } else {
            props = [args[0], args[1], {}];
        }
    } else {
        props = args;
    }
    const [
        React,
        ReactDOM,
        opts
    ] = props;

    if (!React || !React.createElement) {
        throw new Error(`${LOG_PREFIX} missing argument 'React'`);
    }

    // make sure ReactDOM is passed in in browser code
    if (browser && !(ReactDOM && ReactDOM.findDOMNode)) {
        throw new Error(`${LOG_PREFIX} missing argument 'ReactDOM'`);
    }

    deprecate(opts, 'includeSrcNode', msg);
    deprecate(opts, 'throw', msg);
    deprecate(opts, 'warningPrefix', msg);

    const {
        reporter = mkReporter(opts), // make a reporter based on options
        filterFn = always,
        plugins = [],
        rules = {}
      } = opts;

    return {
        React,
        ReactDOM,
        filterFn,
        reporter,
        plugins,
        rules
    };
}

