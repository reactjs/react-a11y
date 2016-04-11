import React      from 'react'
import ReactDOM   from 'react-dom'
import { expect } from 'chai'
import A11y       from '../src/a11y'
import rules      from '../src/rules'

describe('rules', () => {
  Object.keys(rules).forEach(function (rule) {
    describe(rule, () => {
      const {
        'default': defn
      , pass = []
      , fail = []
      } = require('../src/rules/' + rule)

      // get all messages
      const msgs = defn.reduce((acc, def) => acc.concat(def.msg), [])

      pass.forEach(function (ok) {
        it(`doesn't warn when ${ok.when}`, done => {
          const a11y = new A11y(React, ReactDOM, {
            reporter (info) {
              const {
                msg
              } = info
              expect(msgs.indexOf(msg) >= 0).to.be.true
            }
          , rules: {
              [rule]: 'warn'
            }
          })

          // force a11y into sync mode for test
          a11y.__forceSync(true)

          // create the el
          ok.render()

          // restore and finish
          a11y.restoreAll()
          done()
        })
      })

      fail.forEach(function (bad) {
        it(`warns when ${bad.when}`, done => {
          let called = false
          const a11y = new A11y(React, ReactDOM, {
            reporter (info) {
              called = true
              const {
                msg
              } = info
              expect(msgs.indexOf(msg) >= 0).to.be.true
            }
          , rules: {
              [rule]: 'warn'
            }
          })

          // force a11y into sync mode for test
          a11y.__forceSync(true)

          // create the el
          bad.render()

          // make sure error was presented
          expect(called).to.be.true

          a11y.restoreAll()
          done()
        })
      })
    })
  })
})
