var sinon = require('sinon');
var expect = require('chai').expect;

describe('test stubs - functions (spies) with pre-programmed behavior. Supports spy API. When wrapping an existing function with a stub, the original function is not called', function() {
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

	  		var Person = function () {
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

    	expect(function () { 
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
    	expect(stub(42)).to.eql(1);
    	expect(stub(42)).to.eql(2);
    });
  });
});