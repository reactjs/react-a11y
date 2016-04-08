import { expect } from 'chai'
import ReactDOM   from 'react-dom/server'
import defs       from '../src/defaults'

// minimal valid options
const valid = {
  ReactDOM
}

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
    defs({
      ...valid
    , [name]: true
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
    const opts = defs(valid)
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

  requires('ReactDOM')

  contains('reporter')
  contains('filterFn')
  contains('plugins')
  contains('rules')

})
