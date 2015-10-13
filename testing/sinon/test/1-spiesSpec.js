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
	it('spy.withArgs(arg1[, arg2, ...]) - spy that only records calls when received args passed to withArgs', function() {
		var obj = {
			method: function (num) {
				return num;
			}
		}

		var spy = sinon.spy(obj, 'method');
		spy.withArgs(5);
		spy.withArgs(2);

		obj.method(5);
		obj.method(2);

		expect(spy.withArgs(5).calledOnce).to.be.ok;
		expect(spy.withArgs(2).calledOnce).to.be.ok;
	});

	it('spy.callCount - number of recorded calls', function() {
		var spy = sinon.spy();

		spy();
		spy();

		expect(spy.callCount).to.eql(2);
	});

	it('spy.called - true if spy was called at least once', function() {
		var spy = sinon.spy();

		spy();

		expect(spy.called).to.be.true
	});

	it('spy.calledOnce, spy.calledTwice, spy.calledThrice - true if spy called 1, 2 and 3 times', function() {
		var spy = sinon.spy();
		var spy2 = sinon.spy();
		var spy3 = sinon.spy();

		spy();
		spy2(); spy2();
		spy3(); spy3(); spy3();

		expect(spy.calledOnce).to.be.true;
		expect(spy2.calledTwice).to.be.true;
		expect(spy3.calledThrice).to.be.true;
	});

	it('spy.firstCall, spy.secondCall, spy.thirdCall - The first, second and third call', function() {
		var spy = sinon.spy();	

		spy(1);
		spy(2);
		spy(3);

		expect(spy.firstCall).to.be.ok;
		expect(spy.secondCall).to.be.ok;
		expect(spy.thirdCall).to.be.ok;

		expect(spy.firstCall.calledWith(1)).to.be.ok;
		expect(spy.secondCall.calledWith(2)).to.be.ok;
		expect(spy.thirdCall.calledWith(3)).to.be.ok;
	});

	it('spy.lastCall - the last call', function() {
		var spy = sinon.spy();	

		spy(1);
		spy(2);
		spy(3);

		expect(spy.lastCall.calledWith(3)).to.be.ok;
	});

	it('spy.calledBefore(anotherSpy) - Returns true if the spy was called before anotherSpy', function() {
		var spy = sinon.spy();
		var anotherSpy = sinon.spy();

		anotherSpy();
		spy();

		expect(anotherSpy.calledBefore(spy)).to.be.ok;
	});

	it('spy.calledAfter(anotherSpy) - Returns true if the spy was called after anotherSpy', function() {
		var spy = sinon.spy();
		var anotherSpy = sinon.spy();

		spy();
		anotherSpy();

		expect(anotherSpy.calledAfter(spy)).to.be.ok;
	});

	it('spy.calledOn(obj) - Returns true if the spy was called at least once with obj as this', function() {
		var spy = sinon.spy(),
				obj = {};

		spy.call(obj);

		expect(spy.calledOn(obj)).to.be.ok;
	});

	it('spy.alwaysCalledOn(obj) - Returns true if the spy was always called with obj as this', function() {
		var spy = sinon.spy(),
				spy2 = sinon.spy(),
				obj = {};

		spy.call(obj);
		spy.call(obj);

		spy2.call(obj);
		spy2.call(null);

		expect(spy.alwaysCalledOn(obj)).to.be.ok;
		expect(spy2.alwaysCalledOn(obj)).to.not.be.ok;
	});

	it('spy.calledWith(arg1, arg2, ...) - Returns true if spy was called at least once with the provided arguments', function() {
		var spy = sinon.spy();

		spy(1, 2, 3, 4, 5);

		expect(spy.calledWith(1, 2, 3)).to.be.ok;
	});

	it('spy.alwaysCalledWith(arg1, arg2, ...) - Returns true if spy was always called at least once with the provided arguments', function() {
		var spy = sinon.spy();

		spy(1, 2, 3);
		spy(1, 2, 3);
		spy(1, 2, 3);

		expect(spy.alwaysCalledWith(1, 2, 3)).to.be.ok;
	});

	it('spy.calledWithExactly(arg1, arg2, ...) - Returns true if spy was called at least once with the provided arguments and no others', function() {
		var spy = sinon.spy();

		spy(1, 2, 3);

		expect(spy.calledWithExactly(1, 2, 3)).to.be.ok;
	});

	it('spy.alwaysCalledWithExactly(arg1, arg2, ...) - Returns true if spy was always called at least once with the provided arguments and no others.', function() {
		var spy = sinon.spy();

		spy(1, 2, 3);
		spy(1, 2, 3);
		spy(1, 2, 3);

		expect(spy.alwaysCalledWithExactly(1, 2, 3)).to.be.ok;
	});

	it('spy.calledWithMatch(arg1, arg2, ...) - Returns true if spy was called with matching arguments (and possibly others)', function() {
		var spy = sinon.spy();

		spy('hello world');

		expect(spy.calledWithMatch('hello')).to.be.ok;	
	});

	it('spy.alwaysCalledWithMatch(arg1, arg2, ...) - Returns true if spy was always called with matching arguments (and possibly others)', function() {
		var spy = sinon.spy();

		spy('hello world');
		spy('hello peter');
		spy('hello nowak');

		expect(spy.alwaysCalledWithMatch('hello')).to.be.ok;	
	});

	it('spy.calledWithNew() - Returns true if spy/stub was called the new operator', function() {
		var spy = sinon.spy();

		new spy();

		expect(spy.calledWithNew()).to.be.true;
	});

	it('spy.neverCalledWith(arg1, arg2, ...) - Returns true if the spy/stub was never called with the provided arguments', function() {
		var spy = sinon.spy();

		spy(1, 2);

		expect(spy.neverCalledWith(1, 2, 3)).to.be.ok;
	});

	it('spy.neverCalledWithMatch(arg1, arg2, ...) - Returns true if the spy/stub was never called with matching arguments', function() {
		var spy = sinon.spy();

		spy('hello world');
		spy('hello peter');
		spy('hello nowak');

		expect(spy.neverCalledWithMatch('greeting')).to.be.ok;	
	});

	it('spy.threw() - Returns true if spy threw an exception at least once', function() {
		var spy = sinon.spy(function () {
			throw new Error('boom!');
		});

		try {
			spy();
		} catch (e) {}

		expect(spy.threw()).to.be.ok;
	});

	it('spy.threw("TypeError") - Returns true if spy threw an exception of the provided type at least once', function() {
		var spy = sinon.spy(function () {
			throw new ReferenceError('boom!');
		});

		try {
			spy();
		} catch (e) {}

		expect(spy.threw('ReferenceError')).to.be.ok;
	});

	it('spy.threw(obj) - Returns true if spy threw the provided exception object at least once', function() {
		var error = { cause: 'boom!' },
				spy = sinon.spy(function () {
					throw error
				});

		try {
			spy();
		} catch (e) {}

		expect(spy.threw(error)).to.be.ok;
	});

	it('spy.alwaysThrew() - Returns true if spy always threw an exception', function() {
		var spy = sinon.spy(function () {
			throw new Error('boom!');
		});

		try {
			spy();
			spy();
			spy();
		} catch (e) {}

		expect(spy.alwaysThrew()).to.be.ok;
		expect(spy.alwaysThrew('Error')).to.be.ok;
		// expect(spy.alwaysThrew(errObj)).to.be.ok;
	});

	it('spy.returned(obj) - Returns true if spy returned the provided value at least once', function() {
		var spy = sinon.spy(function () {
			return 'done';
		});

		spy();

		expect(spy.returned('done')).to.be.ok;
	});

	it('spy.alwaysReturned(obj) - Returns true if spy always returned the provided value at least once', function() {
		var spy = sinon.spy(function () {
			return 'done';
		});

		spy();
		spy();
		spy();

		expect(spy.alwaysReturned('done')).to.be.ok;
	});

	it('var spyCall = spy.getCall(n) - Returns the nth [call](#spycall)', function() {
		var spy = sinon.spy();

		spy(); spy();

		expect(spy.getCall(0)).to.be.ok;
		expect(spy.getCall(1)).to.be.ok;
	});

	it('spy.thisValues - Array of this objects, spy.thisValues[0] is the this object for the first call.', function() {
		var spy = sinon.spy();

		spy.call('hello', 1, 2, 3);
		spy.call('greeting', 1, 2, 3);
		spy.call('peter', 1, 2, 3);

		expect(spy.thisValues[0]).to.eql('hello');
		expect(spy.thisValues[1]).to.eql('greeting');
		expect(spy.thisValues[2]).to.eql('peter');
	});

	it('spy.args - Array of arguments received, spy.args[0] is an array of arguments received in the first call', function() {
		var spy = sinon.spy();

		spy(1, 2, 3);
		spy('a', 'b', 'c');

		expect(spy.args[0]).to.eql([1, 2, 3]);
		expect(spy.args[1]).to.eql(['a', 'b', 'c']);
	});

	it('spy.exceptions - Array of exception objects thrown, spy.exceptions[0] is the exception thrown by the first call', function() {
		var spy = sinon.spy(function () {
			throw new Error('boom !');
		});

		try {
			spy();
		} catch (e) {}

		expect(spy.exceptions[0]).to.eql(new Error)
	});

	it('spy.returnValues - Array of return values, spy.returnValues[0] is the return value of the first call', function() {
		var spy = sinon.spy(function (arg) {
			return arg
		});

		spy('a');
		spy('b');
		spy('c');

		expect(spy.returnValues[0]).to.eql('a');
		expect(spy.returnValues[1]).to.eql('b');
		expect(spy.returnValues[2]).to.eql('c');
	});

	it('spy.reset() - Resets the state of a spy', function() {
		var spy = sinon.spy();

		spy();

		expect(spy.calledOnce).to.be.true;

		spy.reset();

		expect(spy.called).to.be.false;
	});

	it('spy.printf(format string", [arg1, arg2, ...]) - Returns the passed format string with the following replacements performed (see docs)', function() {
		var spy = sinon.spy();

		spy.call('hello', 1, 2, 3);

		expect(spy.printf('spy: %n, called times:%c')).to.eql('spy: spy, called times:once');
	});
});

describe('individual spy calls', function() {
	it('var spyCall = spy.getCall(n) - Returns the nth [call](#spycall)', function() {
		var spy = sinon.spy();

		spy(); spy();

		expect(spy.getCall(0)).to.be.ok;
		expect(spy.getCall(1)).to.be.ok;
	});

	it('spyCall.calledOn(obj) - Returns true if obj was this for this call', function() {
		var spy = sinon.spy(),
				obj = {};

		spy.call(obj);

		expect(spy.getCall(0).calledOn(obj)).to.be.ok;
	});

	it('spyCall.calledWith(arg1, arg2, ...) - Returns true if spy was called with the provided arguments', function() {
		var spy = sinon.spy();

		spy(1, 2, 3, 4, 5);

		expect(spy.getCall(0).calledWith(1, 2, 3)).to.be.ok;
	});

	it('spyCall.calledWithExactly(arg1, arg2, ...) - Returns true if spy was called with the provided arguments and no others', function() {		var spy = sinon.spy();

		spy(1, 2, 3);

		expect(spy.getCall(0).calledWithExactly(1, 2, 3)).to.be.ok;
	});

	it('spyCall.calledWithMatch(arg1, arg2, ...) - Returns true if spy was called with matching arguments (and possibly others)', function() {
		var spy = sinon.spy();

		spy('hello world');

		expect(spy.getCall(0).calledWithMatch('hello')).to.be.ok;	
	});

	it('spyCall.notCalledWith(arg1, arg2, ...) - Returns true if call did not receive provided arguments', function() {
		var spy = sinon.spy();

		spy('another');

		expect(spy.getCall(0).notCalledWith('boom')).to.be.ok;
	});

	it('spyCall.notCalledWithMatch(arg1, arg2, ...) - Returns true if call did not receive matching arguments', function() {
		var spy = sinon.spy();

		spy('the bom');

		expect(spy.getCall(0).notCalledWithMatch('boom')).to.be.ok;
	});

	it('spyCall.threw() - Returns true if call threw an exception', function() {
		var spy = sinon.spy(function () {
			throw new Error('boom!');
		});

		try {
				spy();
		} catch (e) {}
		
		expect(spy.getCall(0).threw()).to.be.true;
	});

	it('spyCall.threw(TypeError) - Returns true if call threw exception of provided type', function() {
		var spy = sinon.spy(function () {
			throw new ReferenceError('boom!');
		});

		try {
				spy();
		} catch (e) {}
		
		expect(spy.getCall(0).threw('ReferenceError')).to.be.true;
	});

	it('spyCall.threw(obj) - Returns true if call threw provided exception object', function() {
		var errObj = {},
				spy = sinon.spy(function () {
					throw errObj;
				});

		try {
				spy();
		} catch (e) {}
		
		expect(spy.getCall(0).threw(errObj)).to.be.true;
	});

	it('spyCall.thisValue - The call’s this value', function() {
		var spy = sinon.spy();

		spy.call(5);

		expect(spy.getCall(0).thisValue).to.eql(5);
	});

	it('spyCall.args - Array of received arguments', function() {
		var spy = sinon.spy();

		spy(1, 2, 3)

		expect(spy.getCall(0).args).to.eql([1, 2, 3]);
	});

	it('spyCall.exception - Exception thrown, if any', function() {
		var spy = sinon.spy(function () {
					throw new Error();
				});

		try {
			spy();
		} catch (e) {}

		expect(spy.getCall(0).exception).to.eql(new Error);
	});

	it('spyCall.returnValue - return value', function() {
		var spy = sinon.spy(function () {
					return 'peter done';
				});

		spy();

		expect(spy.getCall(0).returnValue).to.eql('peter done');
	});
});
