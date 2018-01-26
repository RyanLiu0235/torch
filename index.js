var Promise = function(executor) {
	var promise = this
	promise._resolves = []
	var resolve = function(value) {
		promise._resolves.forEach(function(fn) {
			fn(value)
		})
	}
	executor(resolve)
}

Promise.prototype.then = function(onFulfilled) {
	this._resolves.push(onFulfilled)
}

module.exports = Promise
