import defRules from './rules'
import {
  devices
}  from './util'

const allDevices = Object.keys(devices).map(key => devices[key])

const severity = function (val) {
  switch (val) {
    case 0:
    case 'off':
      return 'off'

    case 1:
    case 'warn':
      return 'warn'

    case 2:
    case 'error':
      return 'error'

    default:
      throw new Error(`react-a11y: invalid severity ${val}`)
  }
}

const normalize = function (opts = 'off') {
  if ( Array.isArray(opts) ) {
    opts[0] = severity(opts[0])
    return opts
  } else {
    return [ severity(opts) ]
  }
}

export default class Suite {

  constructor (React, ReactDOM, options) {
    this.options  = options
    this.React    = React
    this.ReactDOM = ReactDOM

    if (!this.React && !this.React.createElement) {
      throw new Error('Missing parameter: React')
    }

    const {
      plugins = []
    } = this.options

    // prepare all rules by including every plugin and saving their rules
    // namespaced like plugin/rule
    this.rules = plugins
      .map(function (name) {
        try {
          const mod   = require(`react-a11y-plugin-${name}`)
          const rules = 'default' in mod ? mod.default : mod
          return Object.keys(rules).reduce((acc, key) => ({
              ...acc
            , [`${name}/${key}`]: rules[key]
            }), {})
        } catch (err) {
          throw new Error(`Could not find react-a11y-plugin-${name}`)
        }
      })
      .reduce((acc, next) => ({ ...acc, ...next }), defRules)
  }

  test (tagName, props, children, done) {
    Object.keys(this.options.rules)
      .forEach(function (key) {
          // find ruleopts
          const opts = normalize(this.options.rules[key])
          const [
            sev
          , ...options
          ] = opts

          if ( sev !== 'off' ) {
            const ctx = {
              report (info) {
                const {
                  devices = allDevices
                } = info

                // TODO: fix this and failureHandler to accept all info
                // TODO: add ability to ignore by device class
                done({
                  ...info
                , tagName
                , props
                , severity: sev
                })
              }
            , options
            , React:    this.React
            , ReactDOM: this.ReactDOM
            }

            if ( !(key in this.rules) ) {
              throw new Error(`react-a11y: rule ${key} not found,`
                            + `maybe you're missing a plugin?`)
            }

            const tests = this.rules[key](ctx)

            if ( tagName in tests ) {
              tests[tagName](props, children)
            } else if ( '_any_' in tests ) {
              tests._any_(tagName, props, children)
            }
          }
      }.bind(this))
  }
}
