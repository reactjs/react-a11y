import hasProp from './has-prop'
import trueish from './trueish'

export default function (props) {
  return trueish(props, 'aria-hidden')
}
