var should = require('should');
var expect = require('expect.js');
var chaiExpect = require('chai').expect;

describe('assertions libraries', function() {
	it('can use any assertion library', function () {
		expect(true);
	});

	it('can use should.js assertion library', function() {
		'hello'.length.should.equal(5);
	});

	it('can use expect.js assertion library', function() {
		expect('hello'.length).to.eql(5);
	});

	it('can use chai expect assertion library', function() {
		expect('hello'.length).to.eql(5);
	});
});