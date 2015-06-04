var after = (host, name, cb) => {
  var originalFn = host[name];

  if (originalFn) {
    host[name] = function(...args) {
      originalFn.apply(this, args);
      cb.apply(this, args);
    };
  } else {
    host[name] = cb;
  }
};

module.exports = after;
