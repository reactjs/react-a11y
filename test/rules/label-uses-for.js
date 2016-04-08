import React from 'react'
import {
  warns
, doesnt
} from './helpers'

describe('label-uses-for', () => {

  warns('label-uses-for'
  , 'warns when there is no `htmlFor` prop'
  , /using htmlFor/
  , () => <label />
  )

  doesnt.warn('label-uses-for'
  , 'doesn\'t warn when there is a `htmlFor` prop'
  , /using htmlFor/
  , () => <label htmlFor='foo' />
  )

})

