var expect = require('chai').expect;
var sinon = require('sinon');
var _ = require('underscore');

describe('functions', function() {
  it('_.bind(function, object, *arguments) - Bind a function to an object, meaning that whenever the function is called, the value of this will be the object', function() {
    var spy = sinon.spy(),
      fn = function() {
        spy.apply(this, arguments);
      },
      context = {},
      boundFn = _.bind(fn, context, 1, 2, 3);

    boundFn();

    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(1, 2, 3)).to.be.true;
    expect(spy.calledOn(context)).to.be.true;
  });

  it('_.bindAll(object, *methodNames) - Binds a number of methods on the object, specified by methodNames, to be run in the context of that object whenever they are invoked', function() {
    var fooSpy = sinon.spy(),
	      barSpy = sinon.spy(),
	      obj = {
	        foo: function() {
	          fooSpy.apply(this, arguments);
	        },

	        bar: function() {
	          barSpy.apply(this, arguments);
	        }
	      };

	  _.bindAll(obj, 'foo', 'bar');

	  obj.foo.call(null, 1, 2, 3);
	  obj.bar.call(null, 4, 5, 6);

	  expect(fooSpy.calledOnce).to.be.true;
	  expect(fooSpy.calledOn(obj)).to.be.true;
    expect(fooSpy.calledWith(1, 2, 3)).to.be.true;

	  expect(barSpy.calledOnce).to.be.true;
	  expect(barSpy.calledOn(obj)).to.be.true;
    expect(barSpy.calledWith(4, 5, 6)).to.be.true;
  });

  it('_.partial(function, *arguments) - Partially apply a function by filling in any number of its arguments, without changing its dynamic this value', function() {
  	var spy = sinon.spy(),
  			add = function (a, b) {
  				spy.call(this, a, b);
		  		return a + b
		  	},
		  	add5 = _.partial(add, 5);

		var result = add5(2);

		expect(result).to.eql(7);
		expect(spy.calledWith(5, 2));
  });

  it('_.memoize(function, [hashFunction]) - Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations', function() {
  	var spy = sinon.spy(),
		  	heavyCalc = function(n) {
		  		spy.call(this, n);
		  	},
		  	memoizedCalc = _.memoize(heavyCalc);

		memoizedCalc(1);
		memoizedCalc(1);
		memoizedCalc(2);
		memoizedCalc(1);
		memoizedCalc(2);
		memoizedCalc(3);

		expect(spy.callCount).to.eql(3)
  });

  describe('_.delay(function, wait, *arguments) - Much like setTimeout, invokes function after wait milliseconds', function() {
  	
  	beforeEach(function () {
			this.clock = sinon.useFakeTimers();
  	});

  	afterEach(function () {
			this.clock.restore();
  	});

	  it('should invoke function after 100ms', function(done) {
			var spy = sinon.spy(),
					fn = function () {
						spy.call(this, arguments);
						done();
					}

			_.delay(fn, 100, 'arg');

			expect(spy.called).to.be.false;

			this.clock.tick(99);
			expect(spy.called).to.be.false;

			this.clock.tick(101);
			expect(spy.called).to.be.true;
	  });
  });
  
  it('_.defer(function, *arguments) - Defers invoking the function until the current call stack has cleared, similar to using setTimeout with a delay of 0', function(done) {
		var fn = function () {
					expect(arguments[0]).to.eql('arg');
					done();
				}

		_.defer(fn, 'arg');
  });

  describe('_.throttle(function, wait, [options]) - Creates and returns a new, throttled version of the passed function, that, when invoked repeatedly, will only actually call the original function at most once per every wait milliseconds', function() {
  	beforeEach(function () {
			this.clock = sinon.useFakeTimers();
  	});

  	afterEach(function () {
			this.clock.restore();
  	});

	  it('should invoke function once per each 50ms, even if there are many more calls in that period of time', function() {
			var spy = sinon.spy(),
					fn = function () {
						spy.call(this, arguments);
					},
					throttled = _.throttle(fn, 50, {leading: false});

			expect(spy.callCount).to.eql(0);

			throttled();	
			throttled();		
			throttled();		
			this.clock.tick(50);
			expect(spy.callCount).to.eql(1);

			throttled();	
			throttled();		
			throttled();	
			this.clock.tick(50);
			expect(spy.callCount).to.eql(2);

			throttled();
			throttled();
			throttled();
			this.clock.tick(50);
			expect(spy.callCount).to.eql(3);

			this.clock.tick(150);
			expect(spy.callCount).to.eql(3);
	  });
  });

  describe.skip('(cannot test it) _.debounce(function, wait, [immediate])  - Creates and returns a new debounced version of the passed function which will postpone its execution until after wait milliseconds have elapsed since the last time it was invoked', function() {
  	beforeEach(function () {
			this.clock = sinon.useFakeTimers();
  	});

  	afterEach(function () {
			this.clock.restore();
  	});

	  it('invokes the function after requests stopped arriving', function() {
			var spy = sinon.spy(),
					fn = function () {
						spy.call(this, arguments);
					},
					debounced = _.debounce(fn, 50);

			expect(spy.callCount).to.eql(0);

			debounced();
			debounced();
			debounced();
			this.clock.tick(52);

			expect(spy.callCount).to.eql(0);
	  });
  });

  it('_.once(function) - Creates a version of the function that can only be called one time. Repeated calls to the modified function will have no effect, returning the value from the original call', function() {
			var spy = sinon.spy(),
					fn = function () {
						spy.call(this, arguments);
					},
					onced = _.once(fn);

			onced();
			onced();
			onced();

			expect(spy.callCount).to.eql(1);
  });

  it('_.after(count, function) - Creates a version of the function that will only be run after first being called count times', function() {
			var spy = sinon.spy(),
					fn = function () {
						spy.call(this, arguments);
					},
					aftered = _.after(3, fn);

			aftered();
			aftered();

			expect(spy.callCount).to.eql(0);

			aftered();
			aftered();

			expect(spy.callCount).to.eql(2);
  });

  it('_.before(count, function) - Creates a version of the function that can be called no more than count times. The result of the last function call is memoized and returned when count has been reached', function() {
			var stub = sinon.stub();

			stub.onCall(0).returns(1);
			stub.onCall(1).returns(2);
			stub.onCall(2).returns(3); // this is memoized and always return before 4th call
			stub.onCall(3).returns(4);
			stub.onCall(4).returns(5);

			var befored = _.before(4, stub);

			expect(befored()).to.eql(1);
			expect(befored()).to.eql(2);
			expect(befored()).to.eql(3);
			expect(befored()).to.eql(3);
			expect(befored()).to.eql(3);
  });

  it('_.wrap(function, wrapper) - Wraps the first function inside of the wrapper function, passing it as the first argument. This allows the wrapper to execute code before and after the function runs, adjust the arguments, and execute it conditionally', function() {
  	var stub = sinon.stub().returns('stub');
  			wrapped = _.wrap(stub, function (func) {
  				return 'before-' + func() + '-after';
  			});

  	expect(wrapped()).to.eql('before-stub-after');
  });

  it.skip('_.negate(predicate) - Returns a new negated version of the predicate function', function() {
  	
  });

  it('_.compose(*functions) - Returns the composition of a list of functions, where each function consumes the return value of the function that follows (executes from right to left)', function() {
		var first = sinon.stub().returns('first'),
				second = sinon.stub().returns('second'),
				composed = _.compose(first, second);

		var result = composed('composed');

		sinon.assert.calledOnce(second);
		sinon.assert.calledWith(second, 'composed');

		sinon.assert.calledOnce(first);
		sinon.assert.calledWith(first, 'second');

		expect(result).to.eql('first')
  });
});
