import React from 'react'
import {
  warns
, doesnt
, fn
} from './helpers'

const re = /no `tabIndex` DOM property./

describe('click-but-no-tabindex', () => {

  warns('click-but-no-tabindex'
  , 'warns when there is an `onClick` with no `tabIndex`'
  , re
  , () => <span onClick={fn} />
  )

  doesnt.warn('click-but-no-tabindex'
  , 'doesn\'t warn when there is an `onClick` with a `tabIndex`'
  , re
  , () => <span onClick={fn} tabIndex={0} />
  )

  doesnt.warn('click-but-no-tabindex'
  , 'doesn\'t warn when the element is hidden from aria'
  , re
  , () => <span onClick={fn} ariaHidden />
  )

  doesnt.warn('click-but-no-tabindex'
  , 'doen\'t warn when the element is interactive'
  , re
  , () => <button onClick={fn} />
  )

})
