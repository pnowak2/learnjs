var expect = require('chai').expect;

describe('global objects', function() {
	it('console', function() {
		expect(console).to.be.ok;
		expect(console.log).to.be.a('function')
	});
});