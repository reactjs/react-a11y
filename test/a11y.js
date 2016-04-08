import { expect } from 'chai'
import React      from 'react'
import ReactDOM   from 'react-dom'
import A11y       from '../src/a11y'

describe('A11y', () => {

  it('throws when React or ReactDOM option is invalid', () => {
    expect(() => new A11y()).to.throw('React')
    expect(() => new A11y({})).to.throw('React')
    expect(() => new A11y(React)).to.throw('ReactDOM')
    expect(() => new A11y(React, {})).to.throw('ReactDOM')
  })

  it('restoreAll restores React.createElement', () => {
    const createElement         = React.createElement
    const restorePatchedMethods = after.restorePatchedMethods

    expect(React.createElement).to.equal(createElement)
    const a11y = new A11y(React, ReactDOM)
    expect(React.createElement).to.not.equal(createElement)
    a11y.restoreAll()
    expect(React.createElement).to.equal(createElement)
  })

})
