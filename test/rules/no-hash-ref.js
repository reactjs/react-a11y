import React from 'react'
import {
  warns
, doesnt
, fn
} from './helpers'

const re = /Links must not point to `#`/

describe('no-hash-ref', () => {

  warns('no-hash-ref'
  , 'warns when the `href` is `#`'
  , re
  , () => <a href='#' />
  )

  doesnt.warn('no-hash-ref'
  , 'doesn\'t warn when the link is not `#`'
  , re
  , () => <a href='foo#bar' />
  )

})
