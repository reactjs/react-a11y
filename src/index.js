import A11y from './a11y';

let instance = false;
const a11y = (...opts) => {
    if (instance) {
        throw new Error('react-a11y is already installed');
    } else {
        instance = new A11y(...opts);
    }
};

a11y.restoreAll = () => {
    if (instance) {
        // restore handlers
        instance.restoreAll();

        // remove instance
        instance = false;
    }
};

export default a11y;
