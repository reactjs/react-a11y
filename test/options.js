import { expect } from 'chai'
import React      from 'react'
import ReactDOM   from 'react-dom'
import defs       from '../src/options'

// make sure deprecation warnings are shown
const deprecated = function (name) {
  it(`shows deprecation warning for ${name}`, () => {
    let found
    console.warn = function (...args) {
      found = found || !!args.find(function (arg) {
        return /deprecated/.test(arg) && new RegExp(`\`${name}\``).test(arg)
      })
    }

    // call defs
    defs(React, ReactDOM, {
      [name]: true
    })

    // expect at least one cal to console.warn to match the name
    expect(found).to.be.true
  })
}

// make sure the validator throws if a required option is not set
const requires = function (name) {
  it(`requires the ${name} option to be set`, () => {
    const {
      [name]: _
    , ...rest
    } = valid
    expect(() => defs(rest)).to.throw(name)
  })
}

// make sure the parsed options contain a specific key
const contains = function (name) {
  it(`validated options has ${name}`, () => {
    const opts = defs(React, ReactDOM, {})
    expect(opts).to.have.property(name)
  })
}

describe('options parsing', () => {
  const _warn = console.warn

  afterEach(function () {
    console.warn = _warn
  })

  deprecated('includeSrcNode')
  deprecated('throw')
  deprecated('warningPrefix')

  contains('reporter')
  contains('filterFn')
  contains('plugins')
  contains('rules')
})
