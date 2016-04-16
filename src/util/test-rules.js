/* global describe, it */
/* eslint-disable no-unused-expressions */
import path       from 'path'
import { expect } from 'chai'
import A11y       from '../a11y'

export default function ({ React, ReactDOM, ruleDir, rules }) {
  describe('rules', () => {
    Object.keys(rules).forEach(function (rule) {
      describe(rule, () => {
        const {
          'default': defns
        , pass = []
        , fail = []
        , description
        } = require(path.resolve(ruleDir, rule))

        expect(description).to.be.a.string
        expect(pass).to.have.length.above(0)
        expect(fail).to.have.length.above(0)

        const defn = Array.isArray(defns) ? defns : [ defns ]

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
                [rule]: [
                  'warn'
                , ...(ok.opts || [])
                ]
              }
            })

            // force a11y into sync mode for test
            a11y.__forceSync(true)

            // create the el
            ok.render(React)

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
                [rule]: [
                  'warn'
                , ...(bad.opts || [])
                ]
              }
            })

            // force a11y into sync mode for test
            a11y.__forceSync(true)

            // create the el
            bad.render(React)

            // make sure error was presented
            expect(called).to.be.true

            a11y.restoreAll()
            done()
          })
        })
      })
    })
  })
}
