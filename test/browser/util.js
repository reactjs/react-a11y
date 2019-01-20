import { expect } from 'chai';
import browser from '../../src/util/browser';

describe('util (browser)', () => {
    describe('browser', () => {
        it('is true', () => {
            expect(browser).to.be.true;
        });
    });
});
