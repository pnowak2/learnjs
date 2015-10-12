var sinon = require('sinon');
var expect = require('chai').expect;

describe('spies - testing functions/callbacks and how they are used, invoking original function if spied', function() {
	it('create spy and check how it was called', function() {
		var doSomething = function (callback) {
					callback.call(null, 'done');
				},
				spy = sinon.spy();

		doSomething(spy);

		expect(spy.calledOnce).to.be.ok;
		expect(spy.calledWith('done')).to.be.ok;
		expect(spy.thisValues[0]).to.equal(null);
	});
});

describe('creating spies: sinon.spy()', function() {
	it('sinon.spy() - anonymous functions that records args, this, exceptions and return values', function() {
		var spy = sinon.spy();

		spy();

		expect(spy.called).to.be.ok;
	});

	it('sinon.spy(myFunc) - spies on the provided function. Function body is executed anyway', function() {
		var myFunc = function () { return 'voila!' },
				spy = sinon.spy(myFunc);

		var result = spy()

		expect(spy.called).to.be.ok;
		expect(result).to.equal('voila!')
	});

	it('sinon.spy(object, "method") - spies on the provided object method', function() {
		var obj = {
			fn: function () {
				return 'voila!'
			}
		}

		var spy = sinon.spy(obj, 'fn');

		var result = spy(5);

		expect(spy.calledWith(5)).to.be.ok;
		expect(result).to.equal('voila!');
	});
});

describe('spy api', function() {
	
});