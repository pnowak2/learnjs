var expect = require('chai').expect;

describe('important globals', function() {

	describe('console', function() {
		it('console', function() {
			expect(console).to.be.ok;
			expect(console.log).to.be.a('function')
		});
	});

	describe('time functions', function() {
		it('setTimeout', function() {
			expect(setTimeout).to.be.ok;
		});

		it('setInterval', function() {
			expect(setInterval).to.be.ok;
		});
	});

	describe('file and dir', function() {
		it('__filename (full path of file current module)', function() {
			expect(__filename).to.contain(/*fullpath/*/'importantGlobalsSpec.js');
		});

		it('__dirname (full path of dir current module)', function() {
			expect(__dirname).to.contain(/*fullpath/*/'3-core');
		});
	});

	describe('process', function() {
		it('should be defined', function() {
			expect(process).to.be.ok;
		});

		it('process.argv - contains arguments used to invoke js file by node', function() {
			expect(process.argv).to.be.ok;
			// first - node executable path
			// second - js file name
			// rest - argument passed
			expect(process.argv.length).to.equal(3);
		});

		it('process.nextTick - used to put the callback in the next node cycle', function(done) {
			process.nextTick(function () {
				expect(true).to.be.ok;
				done();
			});
		});
	});

	describe('buffer', function() {
		it('should be defined', function() {
			expect(Buffer).to.be.ok;
		});
	});
});