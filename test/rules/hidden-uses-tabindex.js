import React from 'react'
import {
  warns
, doesnt
, fn
} from './helpers'

const re = /removed it from the tab flow/

describe('hidden-uses-tabindex', () => {

  warns('hidden-uses-tabindex'
  , 'warns when the element is aria-hidden and there is no tabIndex'
  , re
  , () => <div ariaHidden />
  )

  doesnt.warn('hidden-uses-tabindex'
  , 'doesn\'t when the element is not hidden'
  , re
  , () => <div />
  )

  doesnt.warn('hidden-uses-tabindex'
  , 'doesn\'t when the element hidden but tabIndex is -1'
  , re
  , () => <div ariaHidden tabIndex={-1} />
  )

})
