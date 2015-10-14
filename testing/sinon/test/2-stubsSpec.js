var sinon = require('sinon');
var expect = require('chai').expect;

describe('stubs - functions (spies) with pre-programmed behavior. Supports spy API. When wrapping an existing function with a stub, the original function is not called', function() {
  describe('creating stubs', function() {

    describe('var stub = sinon.stub() - creates anonymous stub function', function() {
      it('anonymous stub', function() {
        var stub = sinon.stub();
        expect(stub).to.be.a('function');
      });
    });

    describe('var stub = sinon.stub(object, "method") - replaces object method with stub function', function() {
      it('simple replacement', function() {
        var obj = {
          fn: function() {
            return 'bar!'
          }
        }

        var stub = sinon.stub(obj, 'fn');

        expect(obj.fn()).to.be.undefined;
        expect(obj.fn()).to.not.eql('bar!');
      });

      it('restoring original behaviour', function() {
        var obj = {
          fn: function() {
            return 'bar!'
          }
        }

        var stub = sinon.stub(obj, 'fn');

        expect(obj.fn()).to.be.undefined;

        stub.restore();

        expect(obj.fn()).to.eql('bar!');
      });
    });

    describe('var stub = sinon.stub(object, "method", func) - Replaces object.method with a func, wrapped in a spy', function() {
      it('replaces method with given function', function() {
        var obj = {
          fn: function() {
            return 'bar!'
          }
        }

        var stub = sinon.stub(obj, 'fn', function() {
          return 'stubbed!';
        });

        expect(obj.fn()).to.eql('stubbed!');
      });
    });

    describe('var stub = sinon.stub(obj) - Stubs all the object’s methods', function() {
      it('stubs everything in object', function() {
        var obj = {
          fn: function() {
            return 'bar!';
          },
          bar: function() {
            return 'baz!';
          }
        }

        var stub = sinon.stub(obj);

        expect(obj.fn()).to.be.undefined;
        expect(obj.bar()).to.be.undefined;
      });
    });

    describe('var stub = sinon.createStubInstance(Constructor) - create stub without invoking constructor', function() {
      it('creates instance of Person without invoking Person constructor', function() {
        var spy = sinon.spy();

        var Person = function() {
          spy();
        }

        var personStub = sinon.createStubInstance(Person);

        expect(spy).not.called;
        expect(personStub).to.be.instanceOf(Person);
      });
    });
  });

  describe('stub API', function() {
    it('stub.withArgs(arg1[, arg2, ...]) - Stubs the method only for the provided arguments', function() {
      var stub = sinon.stub();

      stub.withArgs(1).returns(2);
      stub.withArgs(42).throws('Error');

      expect(stub(1)).to.eql(2);

      expect(function() {
        stub(42)
      }).to.throw(Error);
    });

    it('stub.onCall(n) - Defines the behavior of the stub on the nth call. Useful for testing sequential interactions', function() {
      var stub = sinon.stub();
      stub.onCall(0).returns(1);
      // stub.onFirstCall().returns(1)
      stub.onCall(1).returns(2);
      // stub.onSecondCall().returns(2)
      stub.returns(3); // all subsequent calls

      expect(stub()).to.eql(1);
      expect(stub()).to.eql(2);
      expect(stub()).to.eql(3);
      expect(stub()).to.eql(3);
    });

    it('stub.onFirstCall(), stub.onSecondCall(), stub.onThirdCall() - alias for stub.onCall(<0, 1, 2>)', function() {
      var stub = sinon.stub();
      stub.onFirstCall().returns(1);
      stub.onSecondCall().returns(2);
      stub.onThirdCall().returns(3);

      expect(stub()).to.eql(1);
      expect(stub()).to.eql(2);
      expect(stub()).to.eql(3);
    });

    it('stub.withArgs + stub.onCall', function() {
      var stub = sinon.stub();

      stub.withArgs(42)
        .onFirstCall().returns(1)
        .onSecondCall().returns(2)
      stub.returns(0);

      expect(stub()).to.eql(0);
      expect(stub(5)).to.eql(0);
      expect(stub(42)).to.eql(1);
      expect(stub(42)).to.eql(2);
    });

    it('stub.returns(obj) - Makes the stub return the provided value', function() {
    	var stub = sinon.stub();

    	stub.returns(5);

    	expect(stub()).to.eql(5);
    });

    it('stub.returnsArg(index) - Causes the stub to return the argument at the provided index. stub.returnsArg(0); causes the stub to return the first argument', function() {
			var stub = sinon.stub();

			stub.returnsArg(0);

			expect(stub(5, 2)).to.eql(5);
			expect(stub(15, 2)).to.eql(15);
			expect(stub(25, 2)).to.eql(25);
    });

    it('stub.returnsThis() - Causes the stub to return its this value', function() {
    	var stub = sinon.stub();

    	stub.returnsThis();

    	expect(stub.call({ name: 'boo'})).to.eql( {name: 'boo'} );
    });

    it('stub.throws() - Causes the stub to throw an exception (Error)', function() {
    	var stub = sinon.stub();

    	stub.throws(new Error);

    	expect(function () {
    		stub();
    	}).to.throw();
    });

    it('stub.throws("TypeError") - Causes the stub to throw an exception of the provided type', function() {
    	var stub = sinon.stub();

    	stub.throws(new ReferenceError);

    	expect(function () {
    		stub();
    	}).to.throw(ReferenceError);
    });

    it('stub.throws(obj) - Causes the stub to throw an exception of the provided type', function() {
    	var stub = sinon.stub(),
    			errObj = {};

    	stub.throws(errObj);

    	expect(function () {
    		stub();
    	}).to.throw(errObj);
    }); 

    it('stub.callsArg(index) - Causes the stub to call the argument at the provided index as a callback function. stub.callsArg(0); causes the stub to call the first argument as a callback', function() {
			var stub = sinon.stub(),
					spy = sinon.spy();

			stub.callsArg(1);
			stub(null, spy);

			expect(spy.calledOnce).to.be.ok;
    });

    it('stub.callsArgOn(index, context) - Like above but with an additional parameter to pass the this context', function() {
			var stub = sinon.stub(),
					spy = sinon.spy(),
					context = {};

			stub.callsArgOn(0, context);
			stub(spy);

			expect(spy.calledOnce).to.be.ok;
			expect(spy.calledOn(context)).to.be.ok;
    });

    it('stub.callsArgWith(index, arg1, arg2, ...) - Like callsArg, but with arguments to pass to the callback', function() {
			var stub = sinon.stub(),
					spy = sinon.spy();

			stub.callsArgWith(0, 1, 2, 3);
			stub(spy);

			expect(spy.calledOnce).to.be.ok;
			expect(spy.calledWith(1, 2, 3)).to.be.ok;
    });

    it('stub.callsArgOnWith(index, context, arg1, arg2, ...) - Like above but with an additional parameter to pass the this context', function() {
			var stub = sinon.stub(),
					spy = sinon.spy(),
					context = {};

			stub.callsArgOnWith(0, context, 1, 2, 3);
			stub(spy);

			expect(spy.calledOnce).to.be.ok;
			expect(spy.calledWith(1, 2, 3)).to.be.ok;
			expect(spy.calledOn(context)).to.be.ok;
    });

    it('stub.yields([arg1, arg2, ...]) - Almost like callsArg. Causes the stub to call the first callback it receives with the provided arguments (if any)', function() {
			var stub = sinon.stub(),
					spy = sinon.spy();

			stub.yields(1, 2, 3);
			stub(spy);

			expect(spy.calledOnce).to.be.ok;
			expect(spy.calledWith(1, 2, 3)).to.be.ok;
    });

    it('stub.yieldsOn(context, [arg1, arg2, ...]) - Like above but with an additional parameter to pass the this context', function() {
			var stub = sinon.stub(),
					spy = sinon.spy(),
					context = {};

			stub.yieldsOn(context, 1, 2, 3);
			stub(spy);

			expect(spy.calledOnce).to.be.ok;
			expect(spy.calledOn(context)).to.be.ok;
			expect(spy.calledWith(1, 2, 3)).to.be.ok;
    });

    it('stub.yieldsTo(property, [arg1, arg2, ...]) - Causes the spy to invoke a callback passed as a property of an object to the spy', function() {
    	var stub = sinon.stub(),
    			spy = sinon.spy(),
    			obj = {
    				callback: spy
    			};

    	stub.yieldsTo('callback', 1, 2, 3);

    	stub(obj);

    	expect(spy.calledOnce).to.be.true;
    	expect(spy.calledWith(1, 2, 3)).to.be.true;
    });

    it('stub.yieldsToOn(property, context, [arg1, arg2, ...]) - Like above but with an additional parameter to pass the this context', function() {
    	var stub = sinon.stub(),
    			spy = sinon.spy(),
    			context = {},
    			obj = {
    				callback: spy
    			};

    	stub.yieldsToOn('callback', context, 1, 2, 3);

    	stub(obj);

    	expect(spy.calledOnce).to.be.true;
    	expect(spy.calledOn(context)).to.be.true;
    	expect(spy.calledWith(1, 2, 3)).to.be.true;
    });

    it('stub.yield([arg1, arg2, ...]) - Invoke callbacks passed to the stub with the given arguments. If the stub was never called with a function argument, yield throws an error. Also aliased as invokeCallback', function() {
			var stub = sinon.stub(),
					spy = sinon.spy();

			stub(spy);

			stub.yield(1, 2, 3);

			expect(spy.calledOnce).to.be.true;
			expect(spy.calledWith(1, 2, 3)).to.be.true;
    });

    it('stub.yieldTo(callback, [arg1, arg2, ...]) - Invokes callbacks passed as a property of an object to the spy. Like yield, yieldTo grabs the first matching argument, finds the callback and calls it with the (optional) arguments', function() {
    	var callback = sinon.stub(),
    			successSpy = sinon.spy(),
    			failureSpy = sinon.spy();

    	callback({
    		success: successSpy, 
    		failure: failureSpy
    	});

    	callback.yieldTo('failure');

    	expect(failureSpy.calledOnce).to.be.true;
    	expect(successSpy.called).to.be.false;

    	successSpy.reset();
    	failureSpy.reset();

    	callback.yieldTo('success', 1, 2, 3);

    	expect(successSpy.calledOnce).to.be.true;
    	expect(successSpy.calledWith(1, 2, 3)).to.be.true;
    	expect(failureSpy.called).to.be.false;
    });

    it('stub.callArg(argNum) - Like yield, but with an explicit argument number specifying which callback to call', function() {
    	var stub = sinon.stub(),
    			spy1 = sinon.spy(),
    			spy2 = sinon.spy();

    	stub(spy1, spy2);

    	expect(spy1.called).to.be.false;
    	expect(spy2.called).to.be.false;

    	stub.callArg(1);

    	expect(spy1.called).to.be.false;
    	expect(spy2.called).to.be.true;
    });

    it('stub.callArgWith(argNum, [arg1, arg2, ...]) - Like `callArg`, but with arguments.', function() {
    	var stub = sinon.stub(),
    			spy1 = sinon.spy(),
    			spy2 = sinon.spy();

    	stub(spy1, spy2);

    	stub.callArgWith(1, 'a', 'b');

    	expect(spy1.called).to.be.false;
    	expect(spy2.called).to.be.true;
    	expect(spy2.calledWith('a', 'b')).to.be.true;
    });

    it('stub.callsArgWithAsync(index) - Same as their corresponding non-Async counterparts, but with callback being deferred (executed not immediately but after short timeout and in another “thread”)', function(done) {
			var stub = sinon.stub(),
					spy = sinon.spy();

			stub.callsArgWithAsync(1, 'a', 'b', 'c');
			stub(null, function (a, b) {
				expect(Array.prototype.slice.call(arguments)).to.eql(['a', 'b', 'c']);
				done();
			});
    });
  });
});