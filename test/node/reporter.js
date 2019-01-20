import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

import A11y from '../../src/a11y';


const receives = (name, type) => {
    it(`receives \`${name}\``, (done) => {
        const a11y = new A11y(React, ReactDOM, {
            reporter(info) {
                a11y.restoreAll();
                expect(info).to.have.property(name);
                expect(info[name]).to.be.a(type);
                done();
            },
            rules: {
                'img-uses-alt': 1
            }
        });

        // eslint-disable-next-line jsx-a11y/img-has-alt, no-unused-vars
        const el = <img src="haha" />;
    });
};

describe('reporter (node)', () => {
    receives('msg', 'string');
    receives('tagName', 'string');
    receives('severity', 'string');
    receives('props', 'object');
    receives('affects', 'array');
});
