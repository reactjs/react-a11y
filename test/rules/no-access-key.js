import React from 'react'
import {
  warns
, doesnt
, fn
} from './helpers'

const re = /No `accessKey` attribute allowed/

describe('no-access-key', () => {

  warns('no-access-key'
  , 'warns when there is an `accessKey` prop'
  , re
  , () => <div accessKey='a' />
  )

  doesnt.warn('no-access-key'
  , 'doesn\'t warn when there is an no `accessKey` prop'
  , re
  , () => <div />
  )

})
