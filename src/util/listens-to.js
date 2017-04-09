
export default function (props = {}, name) {
    return typeof props[name] === 'function';
}
