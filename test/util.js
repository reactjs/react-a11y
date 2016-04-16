import { expect } from 'chai'
import {
  isInteractive
, hiddenFromAT
, listensTo
, trueish
} from '../src/util'

describe('util', () => {
  describe('hiddenFromAT', () => {
    it('accepts strings or bools', () => {
      expect(hiddenFromAT({ 'aria-hidden':  true })).to.be.true
      expect(hiddenFromAT({ 'aria-hidden': 'true' })).to.be.true
      expect(hiddenFromAT({ 'aria-hidden': 'aria-hidden' })).to.be.true
    })
    it('doesn\'t accept false, or wrong strings', () => {
      expect(hiddenFromAT({ 'aria-hidden':  false })).to.be.false
      expect(hiddenFromAT({ 'aria-hidden': 'false' })).to.be.false
      expect(hiddenFromAT({ 'aria-hidden': 'foo' })).to.be.false
      expect(hiddenFromAT({  })).to.be.false
    })
  })

  describe('trueish', () => {
    it('accepts strings or bools', () => {
      expect(trueish({ fooBar:  true }, 'fooBar')).to.be.true
      expect(trueish({ fooBar: 'true' }, 'fooBar')).to.be.true
      expect(trueish({ fooBar: 'fooBar' }, 'fooBar')).to.be.true
    })

    it('doesn\'t accept false, or wrong strings', () => {
      expect(trueish({ fooBar:  false },  'fooBar')).to.be.false
      expect(trueish({ fooBar: 'false' }, 'fooBar')).to.be.false
      expect(trueish({ fooBar: 'derp' },  'fooBar')).to.be.false
      expect(trueish({ },                 'fooBar')).to.be.false
    })
  })
})
