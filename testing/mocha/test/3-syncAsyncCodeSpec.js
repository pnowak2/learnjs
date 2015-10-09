var expect = require('chai').expect;

describe('synchronous code', function() {
	it('without done callback in function', function() {
		expect('hello'.length).to.eql(5);
	});
});

describe('asynchronous code', function() {

	var asyncFunction = function (successCallback, errorCallback) {
		setTimeout(function () {
			successCallback(200);
		}, 1);
	}

	it('uses the done() callback when testing of async func is complete', function(done) {
		asyncFunction(function (status) {
			expect(status).to.eql(200);
			done();
		});
	});

	it('done() accepts error to fail the test', function(done) {
		done(/* put error here to fail the test */);
	});

	describe('works with promises', function() {
		it('traditional approach', function(done) {
			var promise = Promise.resolve(5);

			promise.then(function (result) {
				expect(result).to.eql(5);
				done();
			});
		});

		it('mocha approach', function() {
			var promise = Promise.resolve(5);
			return promise;
		});
	});
});
