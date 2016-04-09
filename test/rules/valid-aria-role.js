import React from 'react'
import {
  warns
, doesnt
} from './helpers'

const re = /Elements with ARIA roles must use a valid, non-abstract ARIA role/

describe('valid-aria-role', () => {

  warns('valid-aria-role'
  , 'warns when there is an invalid `role`'
  , re
  , () => <div role='foo' />
  )

  doesnt.warn('valid-aria-role'
  , 'doesn\'t warn when there is a role and it is valid'
  , re
  , () => <div role='button' />
  )

  doesnt.warn('valid-aria-role'
  , 'doesn\'t warn when there is no `role`'
  , re
  , () => <div />
  )
})
