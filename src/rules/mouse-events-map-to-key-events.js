import {
  devices
, listensTo
} from '../util'

const mouseOverMsg =
  'onMouseOver must be accompanied by onFocus for accessibility.'

const mouseOutMsg =
  'onMouseOut must be accompanied by onBlur for accessibility.'

const url = 'http://webaim.org/techniques/javascript/eventhandlers#onmouseover'

export default ctx => function (tagName, props) {
  if (  listensTo(props, 'onMouseOver')
    && !listensTo(props, 'onFocus') ) {
    ctx.report({
      msg: mouseOverMsg
    , url
    , affects: [
        devices.keyboardOnly
      ]
    })
  } else if ( listensTo(props, 'onMouseOut')
          && !listensTo(props, 'onBlur') ) {
    ctx.report({
      msg: mouseOutMsg
    , url
    , affects: [
        devices.keyboardOnly
      ]
    })
  }
}

