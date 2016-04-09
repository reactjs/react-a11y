import React from 'react'
import {
  warns
, doesnt
} from './helpers'

const re = /You have an anchor/

describe('tabindex-uses-button', () => {

  warns('tabindex-uses-button'
  , 'warns when anchor has tabIndexbut no button'
  , re
  , () => <a tabIndex={1} />
  )

  doesnt.warn('tabindex-uses-button'
  , 'doesn\'t warn when anchor has no `tabIndex`'
  , re
  , () => <a  />
  )

  doesnt.warn('tabindex-uses-button'
  , 'doesn\'t warn when anchor has `role="button"`'
  , re
  , () => <a role='button' tabIndex={1} />
  )

  doesnt.warn('tabindex-uses-button'
  , 'doesn\'t warn when anchor has a `href`'
  , re
  , () => <a href='foo' tabIndex={1} />
  )

  doesnt.warn('tabindex-uses-button'
  , 'doesn\'t warn when the anchor is hidden'
  , re
  , () => <a tabIndex={1} ariaHidden />
  )
})
