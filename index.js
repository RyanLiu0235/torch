var Promise = function(executor) {
  var promise = this
  promise._resolves = []
  var resolve = function(value) {
    var _resolve = null
    while (_resolve = promise._resolves.shift()) {
      _resolve(value)
    }
  }
  executor(resolve)
}

Promise.prototype.then = function(onFulfilled) {
  this._resolves.push(onFulfilled)

  return this
}

module.exports = Promise
