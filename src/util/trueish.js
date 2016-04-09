
// checks if a prop value is to be considered trueish
// eg.
//   ariaHidden="true"
export default function (props = {}, name = '') {
  const dash = name.replace(/[A-Z]/g, $ => `-${$.toLowerCase()}`)
  return props[name] ===  true
      || props[name] === 'true'
      || props[name] === dash
}
