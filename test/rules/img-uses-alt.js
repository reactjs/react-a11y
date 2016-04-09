import React from 'react'
import {
  warns
, doesnt
} from './helpers'

describe('img-uses-alt', () => {

  warns('img-uses-alt'
  , 'warns when there is no `alt` prop'
  , /img does not have an `alt` prop/
  , () => <img src='foo' />
  )

  doesnt.warn('img-uses-alt'
  , 'doesn\'t warn when there is an `alt` prop'
  , /img does not have an `alt` prop/
  , () => <img src='foo' alt='nice' />
  )

  warns('img-uses-alt'
  , 'warns when the `alt` prop is empty'
  , /empty string/
  , () => <img src='bae' alt='' />
  )

  doesnt.warn('img-uses-alt'
  , 'doesn\'t warn when the `alt` prop is empty'
  , /empty string/
  , () => <img src='bae' alt='' role='presentation' />
  )

  doesnt.warn('img-uses-alt'
  , 'doesn\'t warn when hidden from aria tree'
  , /empty string/
  , () => <img src='bae' ariaHidden />
  )

})

