var expect = require('chai').expect;
var sinon = require('sinon');

describe('hooks', function() {
	var spy = sinon.spy();

	before(function () {
		spy('before');
		// runs before all tests in this block
	});

	after(function () {
		spy('after');
		// runs after all tests in this block
	});

	beforeEach(function () {
		spy('before each');
		// runs before each test in this block
	});

	afterEach(function () {
		spy('after each');
		// runs before each test in this block
	});

	it('should call hooks before and after first test', function() {
		expect(spy.callCount).to.eql(2);
		expect(spy.firstCall.args[0]).to.eql('before');
		expect(spy.secondCall.args[0]).to.eql('before each');
	});

	it('should call hooks before and after second test', function() {
		expect(spy.callCount).to.eql(4);
		expect(spy.getCall(2).args[0]).to.eql('after each');
		expect(spy.getCall(3).args[0]).to.eql('before each');
	});
});

describe('describing hooks', function() {
	beforeEach(function() {

	});

	beforeEach(function namedFun () {

	});

	beforeEach('some description', function () {

	});
});

describe('asynchronous hooks', function() {
	describe('each before hook accepts done() callback to indicate when its done', function() {
		beforeEach(function (done) {
			done();
		})

		it('invoked when async hook is done', function() {
			expect(true);
		});
	});
});

// need to run Mocha with the --delay flag to pass the test below
// setTimeout(function () {
// 	describe('delayed root suite - invoked after async code run first', function() {
// 		it('should behave...', function() {
// 			expect(true);
// 		});		
// 	});

// 	run();
// }, 500);

beforeEach(function () {
	// root level hook invoked before each test case
});