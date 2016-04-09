import React from 'react'
import {
  warns
, doesnt
, fn
} from './helpers'

const re = /but no `role` DOM property/

describe('onclick-uses-role', () => {

  warns('onclick-uses-role'
  , 'warns when there is an `onClick` with no `role`'
  , re
  , () => <span onClick={fn} />
  )

  doesnt.warn('onclick-uses-role'
  , 'doesn\'t warn when there is an `onClick` with a `role`'
  , re
  , () => <span onClick={fn} role='button' />
  )

  doesnt.warn('onclick-uses-role'
  , 'doesn\'t warn when the element is hidden from aria'
  , re
  , () => <span onClick={fn} ariaHidden />
  )

  doesnt.warn('onclick-uses-role'
  , 'doen\'t warn when the element is interactive'
  , re
  , () => <button onClick={fn} />
  )

})
