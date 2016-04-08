import React      from 'react'
import ReactDOM   from 'react'
import A11y       from '../../src/a11y'
import { expect } from 'chai'

const onWarn = function (rule, el, cb) {
  return function (done) {
    let called = false
    const a11y = new A11y(React, {
      ReactDOM
    , reporter (info) {
        called = true
        a11y.restoreAll()
        cb(info)
      }
    , rules: {
        [rule]: 1
      }
    })


    // force a11y into sync mode dfor test
    a11y.__forceSync(true)

    // create the el
    el()

    // because of sync mode, we can callback here
    done()
  }
}

export const warns = function (rule, title, re, el) {
  it(title, onWarn(rule, el, function (info) {
    const {
      msg
    } = info

    expect(msg).to.match(re)
  }))
}

const doesntWarn = function (rule, title, re, el) {
  it(title, onWarn(rule, el, function (info) {
    const {
      msg
    } = info

    expect(msg).to.not.match(re)
  }, true))
}

export const doesnt = { warn: doesntWarn }
