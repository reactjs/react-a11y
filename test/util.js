import { expect } from 'chai';
import {
    hiddenFromAT,
    listensTo,
    trueish,
    hasProp,
    fn
} from '../src/util';

describe('util', () => {
    describe('hiddenFromAT', () => {
        it('accepts strings or bools', () => {
            expect(hiddenFromAT({ 'aria-hidden': true })).to.be.true;
            expect(hiddenFromAT({ 'aria-hidden': 'true' })).to.be.true;
            expect(hiddenFromAT({ 'aria-hidden': 'aria-hidden' })).to.be.true;
        });
        it('doesn\'t accept false, or wrong strings', () => {
            expect(hiddenFromAT({ 'aria-hidden': false })).to.be.false;
            expect(hiddenFromAT({ 'aria-hidden': 'false' })).to.be.false;
            expect(hiddenFromAT({ 'aria-hidden': 'foo' })).to.be.false;
            expect(hiddenFromAT({ })).to.be.false;
        });
    });

    describe('trueish', () => {
        it('accepts strings or bools', () => {
            expect(trueish({ fooBar: true }, 'fooBar')).to.be.true;
            expect(trueish({ fooBar: 'true' }, 'fooBar')).to.be.true;
            expect(trueish({ fooBar: 'fooBar' }, 'fooBar')).to.be.true;
        });

        it('doesn\'t accept false, or wrong strings', () => {
            expect(trueish({ fooBar: false }, 'fooBar')).to.be.false;
            expect(trueish({ fooBar: 'false' }, 'fooBar')).to.be.false;
            expect(trueish({ fooBar: 'derp' }, 'fooBar')).to.be.false;
            expect(trueish({ }, 'fooBar')).to.be.false;
        });
    });

    describe('hasProp', () => {
        it('is false when a prop isn\'t there', () => {
            expect(hasProp({ foo: 'bar' }, 'baz')).to.be.false;
            expect(hasProp({ foo: 'bar' }, ['baz'])).to.be.false;
        });

        it('is true when a prop is there', () => {
            expect(hasProp({ foo: 'bar' }, 'foo')).to.be.true;
            expect(hasProp({ foo: 'bar' }, ['baz', 'foo'])).to.be.true;
        });
    });

    describe('listensTo', () => {
        it('is false when the handler is not a function', () => {
            expect(listensTo({ onClick: 'derp' }, 'onClick')).to.be.false;
        });

        it('is false when the handler is not there', () => {
            expect(listensTo({ }, 'onClick')).to.be.false;
        });

        it('is true when the handler is present and is a function', () => {
            expect(listensTo({ onClick: fn }, 'onClick')).to.be.true;
        });
    });
});
