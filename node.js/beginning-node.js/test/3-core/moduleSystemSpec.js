var expObj = require('./modules/exportObject');
var expAtt = require('./modules/exportAttached');
var expNew = require('./modules/exportAlwaysCreateNew')();
var expFolder = require('./modules/exportEntireFolder');
var expect = require('chai').expect;

describe('exports object', function() {

	it('is always defined in module', function() {
		expect(module.exports).to.be.a('object');
		expect(module.exports).to.eql({});
	});

	it('export entire folder to avoid multiple import declarations', function() {
		expect(expFolder.a).to.be.ok;
		expect(expFolder.b).to.be.ok;
		expect(expFolder.c).to.be.ok;
	});

	it('do not use js extension');
	it('use relative paths for local modules (other are system modules)');

});

describe('importing modules', function() {
	it('import exported object', function() {
		expect(expObj.sum).to.be.a('function');
		expect(expObj.sum(1, 6)).to.equal(7);

		expect(expObj.diff(6, 1)).to.equal(5);
	});

	it('import attached objects', function() {
		expect(expAtt.sum).to.be.a('function');
		expect(expAtt.sum(1, 6)).to.equal(7);

		expect(expAtt.diff(6, 1)).to.equal(5);
	});

	it('import always created new object', function() {
		expect(expNew.sum).to.be.a('function');
		expect(expNew.sum(1, 6)).to.equal(7);

		expect(expNew.diff(6, 1)).to.equal(5);
	});
});
