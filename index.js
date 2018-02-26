var PENDING = 'PENDING'
var FULFILLED = 'FULFILLED'
var REJECTED = 'REJECTED'

var isFunction = function(fun) {
  return typeof fun === 'function'
}
var isPromise = function(instance) {
  return instance instanceof Promise
}
var Promise = function(executor) {
  var promise = this
  var deferreds = []
  var status = PENDING

  var handle = function(value) {
    setTimeout(function() {
      if (deferreds.length > 0) {
        var deferred
        while (deferred = deferreds.shift()) {
          var _resolve = deferred.resolve
          var _reject = deferred.reject
          var handler = deferred[status === FULFILLED ? 'onFulfilled' : 'onRejected']
          var ret

          if (handler === null) {
            status === FULFILLED ? _resolve(value) : _reject(value)
            return
          } else {
            try {
              ret = handler(value)
            } catch (e) {
              _reject(e)
              return
            }
            _resolve(ret)
          }
        }
      }
    }, 0)
  }

  var resolve = function(value) {
    if (status !== PENDING) return
    if (value instanceof Promise) return value
    status = FULFILLED
    handle(value)
  }
  var reject = function(value) {
    if (status !== PENDING) return
    status = REJECTED
    handle(value)
  }
  executor(resolve, reject)

  this.then = function(onFulfilled, onRejected) {
    return new promise.constructor(function(resolve, reject) {
      var handle = new Handler(onFulfilled, onRejected, resolve, reject)
      deferreds.push(handle)
    })
  }
}

var Handler = function(onFulfilled, onRejected, resolve, reject) {
  this.onFulfilled = isFunction(onFulfilled) ? onFulfilled : null
  this.onRejected = isFunction(onRejected) ? onRejected : null
  this.resolve = resolve
  this.reject = reject
}

Promise.resolve = function(value) {
  if (value instanceof Promise) return value
  return new Promise(function(resolve) {
    resolve(value)
  })
}

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value)
  })
}
module.exports = Promise
