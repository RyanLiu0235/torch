var Promise = require('../')
var expect = require('chai').expect

describe('the basic usage of Promise', function() {
  it('should be handled with resolve when fulfilled', function(done) {
    var promise = new Promise(function(resolve) {
      setTimeout(function() {
        resolve('fulFilled')
        done()
      }, 1000)
    })
    promise.then(rs => {
      expect(rs).to.be.equal('fulFilled')
    })
  })

  it('should be thenable in chain', function(done) {
    var promise = new Promise(function(resolve) {
      setTimeout(function() {
        resolve('fulFilled')
        done()
      }, 1000)
    })
    promise.then(rs => {
      return rs
    }).then(rs => {
      expect(rs).to.be.equal('fulFilled')
    })
  })
})
