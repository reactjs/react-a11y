import React from 'react'
import {
  warns
, doesnt
, fn
} from './helpers'

const re = /`onBlur` should be preferred/

describe('use-onblur-not-onchange', () => {

  warns('use-onblur-not-onchange'
  , 'warns when there is the `onChange` prop is present'
  , re
  , () => <input onChange={fn} />
  )

  doesnt.warn('use-onblur-not-onchange'
  , 'doesn\'t warn when there is no `onChange` prop'
  , re
  , () => <input />
  )

  doesnt.warn('use-onblur-not-onchange'
  , 'doesn\'t warn when the element is aria-hidden'
  , re
  , () => <input onChange={fn} ariaHidden />
  )

  doesnt.warn('use-onblur-not-onchange'
  , 'doesn\'t warn when the element is aria-disabled'
  , re
  , () => <input onChange={fn} ariaDisabled />
  )

  doesnt.warn('use-onblur-not-onchange'
  , 'doesn\'t warn when the element is aria-readonly'
  , re
  , () => <input onChange={fn} ariaReadonly />
  )

})
