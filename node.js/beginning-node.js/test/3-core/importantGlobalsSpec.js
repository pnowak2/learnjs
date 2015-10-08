var expect = require('chai').expect;

describe('important globals', function() {
	it('console', function() {
		expect(console).to.be.ok;
		expect(console.log).to.be.a('function')
	});

	it('setTimeout', function() {
		expect(setTimeout).to.be.ok;
	});

	it('setInterval', function() {
		expect(setInterval).to.be.ok;
	});

	it('__filename (full path of file current module)', function() {
		expect(__filename).to.contain(/*fullpath/*/'importantGlobalsSpec.js');
	});

	it('__dirname (full path of dir current module)', function() {
		expect(__dirname).to.contain(/*fullpath/*/'3-core');
	});

	it('process', function() {
		expect(process).to.be.ok;
	});
});