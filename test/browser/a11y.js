import { expect } from 'chai'
import React      from 'react'
import ReactDOM   from 'react-dom'
import A11y       from '../../src/a11y'

describe('A11y (browser)', () => {
  it('throws when ReactDOM option is invalid', () => {
    expect(() => new A11y(React)).to.throw('React')
    expect(() => new A11y(React, {})).to.throw('React')
  })
})
