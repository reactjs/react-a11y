
// store how to undo these changes
let restoreFunctions = [];

// does nothing
const noop = () => null;

const after = (host, name, cb) => {
    if (!host) {
        throw new Error('cannot replace function on undefined');
    }

    // save original
    const original = host[name] || noop;

    // override host
    host[name] = (...args) => {
        // perform original
        original.apply(host, args);
        // perform cb
        cb(...args);
    };

    // save restoring function
    restoreFunctions.push(() => {
        host[name] = original;
    });
};

after.restorePatchedMethods = () => {
    // perform each restoring function
    restoreFunctions.forEach(restore => restore());

    // clear the list of functions to restore
    restoreFunctions = [];
};

after.render = (component, fn) => {
    after(component, 'componentDidMount', fn);
    after(component, 'componentDidUpdate', fn);
};

export default after;
