import React      from 'react'
import ReactDOM   from 'react'
import { expect } from 'chai'
import A11y       from '../../src/a11y'

const warns = function (rule, title, re, el) {
  it(title, done => {
    const a11y = new A11y(React, {
      ReactDOM
    , reporter ({ props, msg }) {
        const ok = msg && re.test(msg)
        expect(ok).to.be.true
        done()
      }
    , rules: {
        'img-uses-alt': 1
      }
    })

    el()

    a11y.restoreAll()
  })
}

describe('img-uses-alt', () => {

  warns('img-uses-alt'
  , 'warns when there is no `alt` prop'
  , /img does not have an `alt` prop/
  , () => <img src='foo' />
  )

  warns('img-uses-alt'
  , 'warns when the `alt` prop is empty'
  , /empty string/
  , () => <img src='bae' alt='' />
  )

})

