import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

import A11y from '../../src/a11y';


const receives = (name, type) => {
    it(`receives \`${name}\``, (done) => {
        const div = document.createElement('div');
        document.body.appendChild(div);

        const a11y = new A11y(React, ReactDOM, {
            reporter(info) {
                expect(info).to.have.property(name);
                expect(typeof info[name]).to.equal(type);
                a11y.restoreAll();
                done();
            },
            rules: {
                'img-uses-alt': 1
            }
        });

        // eslint-disable-next-line jsx-a11y/img-has-alt
        const Test = () => (<img src="haha" />);

        ReactDOM.render(<Test />, div);
    });
};

describe('reporter (browser)', () => {
    receives('msg', 'string');
    receives('tagName', 'string');
    receives('severity', 'string');
    receives('props', 'object');
    receives('displayName', 'string');
    receives('DOMNode', 'object');
});
