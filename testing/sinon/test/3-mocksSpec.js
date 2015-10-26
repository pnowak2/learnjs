var sinon = require('sinon');
var expect = require('chai').expect;

describe('mocks - Mocks (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs) as well as pre-programmed expectations. A mock will fail your test if it is not used as expected', function() {
	describe('creating mocks', function() {

		var api = {
			fn: function () {
				return 'test api';
			}
		}

		describe('var mock = sinon.mock(obj) - Does not change the object, but returns a mock object to set expectations on the object’s methods', function() {
			it('should behave...', function() {
				var mock = sinon.mock(api);
			});
		});
	});
});