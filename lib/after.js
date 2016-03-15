let restoreFunctions = [];

const after = (host, name, cb) => {
  const originalFn = host[name];
  let restoreFn;

  if (originalFn) {
    host[name] = function(...args) {
      originalFn.apply(this, args);
      cb.apply(this, args);
    };
    restoreFn = () => host[name] = originalFn;
  } else {
    host[name] = function(...args) {
      cb.apply(this, args);
    };
    restoreFn = () => delete host[name];
  }

  restoreFunctions.push(restoreFn);
};

after.restorePatchedMethods = () => {
  restoreFunctions.forEach(restoreFn => restoreFn());
  restoreFunctions = [];
};

module.exports = after;
