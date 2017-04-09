
// checks if a prop value is to be considered trueish
export default function (props = {}, name = '') {
    return props[name] === true
      || props[name] === 'true'
      || props[name] === name;
}
