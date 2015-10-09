var expect = require('chai').expect;

describe('language chains', function() {
	var obj = {
		name: 'testing..'
	};

	it('chainable getters: to, be, been, is, that, which, and, has, have, with, at, of, same reference the subject', function() {
		var getterNames = ['to', 'be', 'been', 'is', 'that', 'which', 'and', 'has', 'have', 'with', 'at', 'of', 'same'],
				chainedGetters = getterNames.map(function (getterName) {
					return expect(obj)[getterName]
				});

		chainedGetters.forEach(function (getter) {
			expect(getter.__flags.object).to.equal(obj);
		});
	});
});