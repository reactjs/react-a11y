import React from 'react'
import {
  warns
, doesnt
, fn
} from './helpers'

describe('mouse-events-map-to-key-events', () => {

  warns('mouse-events-map-to-key-events'
  , 'warns when there is `onMouseOver` and no `onFocus`'
  , /onMouseOver must be/
  , () => <div onMouseOver={fn} />
  )

  doesnt.warn('mouse-events-map-to-key-events'
  , 'doesn\'t warn when there is `onMouseOver` and `onFocus`'
  , /onMouseOver must be/
  , () => <div onMouseOver={fn} onFocus={fn} />
  )

  warns('mouse-events-map-to-key-events'
  , 'warns when there is `onMouseOut` and no `onBlur`'
  , /onMouseOut must be/
  , () => <div onMouseOut={fn} />
  )

  doesnt.warn('mouse-events-map-to-key-events'
  , 'doesn\'t warn when there is `onMouseOut` and `onBlur`'
  , /onMouseOut must be/
  , () => <div onMouseOut={fn} onBlur={fn} />
  )
})

