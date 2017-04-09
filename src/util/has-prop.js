
const hasProp = (props, any) => {
    if (Array.isArray(any)) {
        return any.reduce((acc, prop) => acc || hasProp(props, prop), false);
    }
    return props && any && any in props;
};

export default hasProp;
