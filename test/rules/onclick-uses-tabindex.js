import React from 'react'
import {
  warns
, doesnt
, fn
} from './helpers'

const re = /no `tabIndex` DOM property./

describe('onclick-uses-tabindex', () => {

  warns('onclick-uses-tabindex'
  , 'warns when there is an `onClick` with no `tabIndex`'
  , re
  , () => <span onClick={fn} />
  )

  doesnt.warn('onclick-uses-tabindex'
  , 'doesn\'t warn when there is an `onClick` with a `tabIndex`'
  , re
  , () => <span onClick={fn} tabIndex={0} />
  )

  doesnt.warn('onclick-uses-tabindex'
  , 'doesn\'t warn when the element is hidden from aria'
  , re
  , () => <span onClick={fn} ariaHidden />
  )

  doesnt.warn('onclick-uses-tabindex'
  , 'doen\'t warn when the element is interactive'
  , re
  , () => <button onClick={fn} />
  )

})
