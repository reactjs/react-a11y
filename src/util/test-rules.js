/* global describe, it */
/* eslint-disable no-unused-expressions,global-require,import/no-dynamic-require */
import path from 'path';
import { expect } from 'chai';
import A11y from '../a11y';

export default function ({ React, ReactDOM, rules }) {
    describe('rules', () => {
        Object.keys(rules).forEach((rule) => {
            describe(rule, () => {
                const {
                    default: defns,
                    test,
                    pass = [],
                    fail = [],
                    description
                } = require(`../rules/${rule}`);

                expect(description).to.be.a.string;
                expect(pass).to.have.length.above(0);
                expect(fail).to.have.length.above(0);

                const defn = Array.isArray(defns) ? defns : [defns];

                // get all messages
                const msgs = defn.reduce((acc, def) => acc.concat(def.msg), []);

                pass.forEach((ok) => {
                    it(`doesn't warn when ${ok.when}`, (done) => {
                        let cnt = 0;
                        const a11y = new A11y(React, ReactDOM, {
                            reporter(info) {
                                const {
                                    msg
                                } = info;

                                if (msgs.indexOf(msg) >= 0) {
                                    cnt += 1;
                                }
                            },
                            rules: {
                                [rule]: [
                                    'warn',
                                    ...(ok.opts || [])
                                ]
                            }
                        });

                        // create the el
                        ok.render(React);

                        // restore and finish
                        setTimeout(() => {
                            expect(cnt === 0).to.be.true;
                            a11y.restoreAll();
                            done();
                        }, 20);
                    });
                });

                fail.forEach((bad) => {
                    it(`warns when ${bad.when}`, (done) => {
                        let called = false;
                        const a11y = new A11y(React, ReactDOM, {
                            reporter(info) {
                                called = true;
                                const {
                                    msg
                                } = info;
                                expect(msgs.indexOf(msg) >= 0).to.be.true;
                                a11y.restoreAll();
                                done();
                            },
                            rules: {
                                [rule]: [
                                    'warn',
                                    ...(bad.opts || [])
                                ]
                            }
                        });

                        // create the el
                        bad.render(React);
                    });
                });
            });
        });
    });
}
