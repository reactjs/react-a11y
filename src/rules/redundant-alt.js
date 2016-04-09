import {
  devices
, hiddenFromAT
} from '../util'

const def = [
  'image'
, 'picture'
, 'photo'
]

export default ctx => ({
  img (props) {
    const hidden   = hiddenFromAT(props)
    const alt      = (props.alt || '').toLowerCase()
    const words    = ctx.options[0] || def
    const contains = words.reduce((a, w) => a || (alt.indexOf(w) >= 0), false)

    if ( !hidden && contains ) {
      ctx.report({
        msg: 'Redundant `alt` attribute. Screen-readers already announce `img` tags as an image. '
           + 'You don\'t need to use the words like `image`, `photo,` or `picture` in the alt prop.'
      , url: 'http://webaim.org/techniques/alttext'
      , affects: [
          devices.screenReaders
        ]
      })
    }
  }
})
