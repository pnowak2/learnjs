var expect = require('chai').expect;

describe('bdd assertions', function() {
	it('.not()', function() {
		expect('peter').not.to.equal('piotr');
	});

	it.skip('deep', function() {
		
	});
});

describe('multiple assertions in one chain', function() {
	it('can chain assertions', function() {
		expect('peter'.length)
			.to.eql(5)
			.and.below(10)
			.and.a('number');
	});
});
