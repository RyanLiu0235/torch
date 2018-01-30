var Promise = require('../')
var tests = require('promises-aplus-tests')
var adapter = {}

adapter.deferred = function() {
  var resolve, reject
  var promise = new Promise(function(_resolve, _reject) {
    resolve = _resolve
    reject = _reject
  })
  return {
    promise: promise,
    resolve: resolve,
    reject: reject
  }
}
adapter.resolved = Promise.resolve
adapter.rejected = Promise.reject

tests.mocha(adapter)
