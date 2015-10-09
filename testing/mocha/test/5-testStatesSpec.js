var expect = require('chai').expect;

describe('pending tests', function() {
	it('is pending/eventual test, does not provide function');
});

describe/*.only*/('exclusive tests/suites', function() {
	it/*.only*/('only - run only the given test', function() {
		expect(true);
	});
});

describe/*.skip*/('skipping tests/suites', function() {
	it/*.skip*/('skip - skips the given test', function() {
		expect(true);
	});
});