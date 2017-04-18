import defRules from './rules';
import * as util from './util';

const allDevices = Object.keys(util.devices).map(key => util.devices[key]);

const severity = (val) => {
    switch (val) {
            case 0:
            case 'off':
                return 'off';

            case 1:
            case 'warn':
                return 'warn';

            case 2:
            case 'error':
                return 'error';

            default:
                throw new Error(`react-a11y: invalid severity ${val}`);
    }
};

const normalize = (opts = 'off') => {
    if (Array.isArray(opts)) {
        opts[0] = severity(opts[0]);
        return opts;
    }
    return [severity(opts)];
};

const getTests = defns => (Array.isArray(defns) ? defns : [defns]);

export default class Suite {

    constructor(React, ReactDOM, options) {
        this.options = options;
        this.React = React;
        this.ReactDOM = ReactDOM;

        if (!this.React && !this.React.createElement) {
            throw new Error('Missing parameter: React');
        }

        const {
            plugins = []
        } = this.options;

        // prepare all rules by including every plugin and saving their rules
        // namespaced like plugin/rule
        this.rules = plugins
        .map((name) => {
            try {
                // eslint-disable-next-line global-require,import/no-dynamic-require
                const mod = require(`react-a11y-plugin-${name}`);
                const rules = 'default' in mod ? mod.default.rules : mod.rules;
                return Object.keys(rules).reduce((acc, key) => ({
                    ...acc,
                    [`${name}/${key}`]: rules[key]
                }), {});
            } catch (err) {
                throw new Error(`Could not find react-a11y-plugin-${name}`);
            }
        })
        .reduce((acc, next) => ({ ...acc, ...next }), defRules);
    }

    test(tagName, props, children, done) {
        Object.keys(this.options.rules).forEach((key) => {
            const rule = this.rules[key];

            // ensure that the rule exists
            if (!rule) {
                throw new Error(`react-a11y: rule ${key} not found, `
                    + 'maybe you\'re missing a plugin?');
            }

            // get options for rule
            const [
                sev,
                ...options
            ] = normalize(this.options.rules[key]);

            if (sev !== 'off') {
                const ctx = {
                    options,
                    React: this.React,
                    ReactDOM: this.ReactDOM
                };

                getTests(rule).reduce(async (pprev, defn) => {
                    // only fail once per rule
                    // so check if previous test failed
                    // already, if this is true, they havn't-

                    const prev = await pprev;
                    if (!prev) {
                        return prev;
                    }

                    const {
                        tagName: tagNames,
                        msg,
                        url,
                        AX,
                        test,
                        affects = allDevices
                    } = defn;

                    // filter by tagName
                    if (Array.isArray(tagNames)) {
                        if (tagNames.indexOf(tagName) < 0) {
                            return prev;
                        }
                    } else if (tagNames) {
                        if (tagName !== tagNames) {
                            return prev;
                        }
                    }

                    // perform the test
                    let pass;
                    // try/catch so that exceptions are not silently swallowed by await
                    try {
                        pass = await test(tagName, props, children, ctx);
                    } catch (error) {
                        console.log(error);
                        pass = false;
                    }

                    if (!pass) {
                        done({
                            tagName,
                            msg,
                            url,
                            AX,
                            props,
                            children,
                            severity: sev,
                            rule: key,
                            affects
                        });
                    }

                    return prev && pass;
                }, true);
            }
        });
    }
}
