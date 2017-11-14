import { expect } from 'chai'
import browser from '../../src/util/browser'

describe('util (node)', () => {
  describe('browser', () => {
    it('is false', () => {
      expect(browser).to.be.false
    })
  })
})
