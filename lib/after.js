var after = (host, name, cb) => {
  var originalFn = host[name];

  if (originalFn) {
    host[name] = function() {
      originalFn.call(this);
      cb.call(this);
    };
  } else {
    host[name] = cb;
  }
};

module.exports = after;
