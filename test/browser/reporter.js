import A11y       from '../../src/a11y'
import React      from 'react'
import ReactDOM   from 'react-dom'
import { expect } from 'chai'

const recieves = function (name, type) {
  it(`recieves \`${name}\``, done => {

    const div = document.createElement('div')
    document.body.appendChild(div)

    const a11y = new A11y(React, ReactDOM, {
      reporter (info) {
        expect(info).to.have.property(name)
        expect(typeof info[name]).to.equal(type)
        a11y.restoreAll()
        done()
      }
    , rules: {
        'img-uses-alt': 1
      }
    })

    class Test extends React.Component {
      render () {
        return <img src='haha' />
      }
    }

    const el = <Test />
    ReactDOM.render(<Test />, div)
  })
}

describe('reporter (browser)', () => {
  recieves('msg',         'string')
  recieves('tagName',     'string')
  recieves('severity',    'string')
  recieves('props',       'object')
  recieves('displayName', 'string')
})
