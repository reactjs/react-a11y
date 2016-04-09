import React from 'react'
import {
  warns
, doesnt
, fn
} from './helpers'

const re = /"Space" key/

describe('button-role-space', () => {

  warns('button-role-space'
  , 'warns when there is an `onClick` with no `role`'
  , re
  , () => <div role='button' />
  )

  doesnt.warn('button-role-space'
  , 'doesn\'t warn when there is an `onClick` with a `role`'
  , re
  , () => <div role='button' onKeyDown={fn} />
  )
})
