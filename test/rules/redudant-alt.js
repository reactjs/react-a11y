import React from 'react'
import {
  warns
, doesnt
} from './helpers'

const re = /Redundant `alt`/
describe('redundant-alt', () => {

  warns('redundant-alt'
  , 'warn whenever there is a redundant alt message'
  , re
  , () => <img src='foo' alt='bar image foo' />
  )

  doesnt.warn('redundant-alt'
  , 'doesn\'t warn when the alt does not contain redundant words'
  , re
  , () => <img src='foo' alt='nice' />
  )

  doesnt.warn('redundant-alt'
  , 'doesn\'t warn when the element is aria-hidden'
  , re
  , () => <img src='foo' alt='nice' ariaHidden />
  )

  doesnt.warn('redundant-alt'
  , 'doesn\'t warn when there are no bad words'
  , re
  , () => <img src='foo' alt='nice' />
  , []
  )

})
