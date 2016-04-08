import React      from 'react'
import ReactDOM   from 'react'
import { expect } from 'chai'
import A11y       from '../../src/a11y'

const warns = function (rule, title, re, el) {
  it(title, () => {
    let ok = false

    const a11y = new A11y(React, {
      ReactDOM
    , reporter ({ props, msg }) {
        console.log(props, msg)
        ok = msg && re.test(msg)
      }
    , rules: {
        'img-uses-alt': 1
      }
    })

    el()
    expect(ok).to.be.true

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

