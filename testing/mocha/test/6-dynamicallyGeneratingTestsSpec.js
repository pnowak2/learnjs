var expect = require('chai').expect;

describe('dynamically generated tests', function() {

	var tests = [
		{ name: 'first test' },
		{ name: 'second test' },
		{ name: 'third test' }
	]

	tests.forEach(function (test) {
		it(test.name, function () {
			expect(true);
		})
	})
});
