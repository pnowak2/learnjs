describe('Various tests', function() {
	it('should invoke function', function() {

		var factorySpy = jasmine.createSpy('factorySpy'),
			depSpy = jasmine.createSpy('depspy');

		(function (factory) {
			factorySpy(factory);
			factory(1, 2, 3);
		}(function (a, b, c) {
			depSpy(a, b, c);
		}));

		expect(factorySpy).toHaveBeenCalled();
		expect(depSpy).toHaveBeenCalledWith(1, 2, 3);
	});

	it('should check for self object which is window object', function() {
		expect(window.self).toBeDefined();
		expect(window.self).toBe(window);
	});

	it('should redirect a method from one object to the other', function() {
		var jq = {
			trim: function (str) {
				var spaceRegexp = /\s+/g;
				return str.replace(spaceRegexp, '');
			}
		},
			newObj = {};

		newObj.trim = function (str) {
			return jq.trim(str);
		}

		expect(jq.trim("  test ")).toEqual('test');
		expect(newObj.trim).toBeDefined();
		expect(newObj.trim('   desd ')).toEqual('desd');
	});

});