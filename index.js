var PENDING = 'PENDING'
var FULFILLED = 'FULFILLED'
var REJECTED = 'REJECTED'

var noop = function() {}

var Promise = function(executor) {
  var promise = this
  promise._resolves = []
  promise._rejects = []
  promise.status = PENDING

  var handle = function(status, value) {
    // status should be immutable once mutated from PENDING
    if (promise.status !== PENDING) return
    promise.status = status
    var queue = promise[status === FULFILLED ? '_resolves' : '_rejects']
    var _handle = null

    while (_handle = queue.shift()) {
      _handle(value)
    }
  }
  var resolve = function(value) {
    handle(FULFILLED, value)
  }
  var reject = function(value) {
    handle(REJECTED, value)
  }
  executor(resolve, reject)

  this.then = function(onFulfilled, onRejected) {
    this._resolves.push(typeof onFulfilled === 'function' ? onFulfilled : noop)
    this._rejects.push(typeof onRejected === 'function' ? onRejected : noop)

    return this
  }
}

module.exports = Promise
