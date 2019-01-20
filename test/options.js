import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';

import defs from '../src/options';

// make sure deprecation warnings are shown
const deprecated = (name) => {
    it(`shows deprecation warning for ${name}`, () => {
        let found = false;
        // eslint-disable-next-line no-console
        console.warn = (...args) => {
            found = found || !!args.find(arg => /deprecated/.test(arg) && new RegExp(`\`${name}\``).test(arg));
        };

        // call defs
        defs(React, ReactDOM, {
            [name]: true
        });

        // expect at least one cal to console.warn to match the name
        expect(found).to.be.true;
    });
};

// make sure the validator throws if a required option is not set
const requires = (name) => {
    it(`requires the ${name} option to be set`, () => {
        expect(() => defs(React, ReactDOM, {})).to.throw(name);
    });
};

// make sure the parsed options contain a specific key
const contains = (name) => {
    it(`validated options has ${name}`, () => {
        const opts = defs(React, ReactDOM, {});
        expect(opts).to.have.property(name);
    });
};

describe('options parsing', () => {
    // eslint-disable-next-line no-console
    const _warn = console.warn;

    afterEach(() => {
        // eslint-disable-next-line no-console
        console.warn = _warn;
    });

    deprecated('includeSrcNode');
    deprecated('throw');
    deprecated('warningPrefix');

    contains('reporter');
    contains('filterFn');
    contains('plugins');
    contains('rules');
});
