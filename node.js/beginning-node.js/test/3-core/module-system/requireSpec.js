var math = require('./modules/math.js');
var expect = require('chai').expect;

describe('importing modules', function() {
	it('import custom module', function() {
		expect(math.sum).to.be.a('function');
		expect(math.sum(1, 6)).to.equal(7);
	});
});
