
// store how to undo these changes
let restoreFunctions = []

// does nothing
const noop = () => null

const after = function (host, name, cb) {
  if ( !host ) {
    throw new Error('cannot replace function on undefined')
  }

  // save original
  const original = host[name] || noop

  // override host
  host[name] = function (...args) {
    // perform original
    original.apply(this, args)
    // perform cb
    cb.apply(this, args)
  }

  // save restoring function
  restoreFunctions.push(function () {
    host[name] = originalFn
  })
}

after.restorePatchedMethods = function () {
  // perform each restoring function
  restoreFunctions.forEach(restore => restore())

  // clear the list of functions to restore
  restoreFunctions = []
}

export default after


