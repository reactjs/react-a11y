
const hasProp = function (props, any) {
  if ( Array.isArray(any) ) {
    return any.reduce((a, prop) => a || hasProp(props, prop), false)
  } else {
    return props && any && any in props
  }
}

export default hasProp
