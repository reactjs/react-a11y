import React from 'react'
import {
  warns
, doesnt
, fn
} from './helpers'

const re = /You have a click handler on a non-interactive/

describe('click-but-no-role', () => {

  warns('click-but-no-role'
  , 'warns when there is an `onClick` with no `role`'
  , re
  , () => <span onClick={fn} />
  )

  doesnt.warn('click-but-no-role'
  , 'doesn\'t warn when there is an `onClick` with a `role`'
  , re
  , () => <span onClick={fn} role='button' />
  )

  doesnt.warn('click-but-no-role'
  , 'doesn\'t warn when the element is hidden from aria'
  , re
  , () => <span onClick={fn} ariaHidden />
  )

  doesnt.warn('click-but-no-role'
  , 'doen\'t warn when the element is interactive'
  , re
  , () => <button onClick={fn} />
  )

})
