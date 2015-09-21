describe('ECMAScript 5', function() {
	it('should define property', function() {

		var obj = {

		}

		Object.defineProperty(obj, "prop", {
			value: 'my property',
			writable: false,
			configurable: false
		});

		expect(obj.prop).toBeDefined();
		expect(obj.prop).toBe('my property');

		obj.prop = 'test';
		expect(obj.prop).toBe('my property');

		delete obj.prop

		expect(obj.prop).toBeDefined();
	});

	it('should define getters and setters', function() {
		var obj = {};

		var setSpy = jasmine.createSpy('setSpy');
		var getSpy = jasmine.createSpy('getSpy');

		Object.defineProperty(obj, 'prop', {
			configurable: false,
			set: function (newValue) {
				setSpy(newValue);
			},

			get: function () {
				getSpy();
			}
		});

		obj.prop = 'test';

		expect(setSpy).toHaveBeenCalledWith('test');

		obj.prop;

		expect(getSpy).toHaveBeenCalled();
	});

	it('should user Object.create() built in method', function() {
		var obj = {
			prop: 'myprop',
			action: function () {}
		}

		var copyObj = Object.create(obj, {
			another: {
				configurable: false,
				value: 'anothe value'
			}
		});

		expect(copyObj.prop).toBe('myprop');
		expect(copyObj.action).toBeDefined();

		expect(copyObj.hasOwnProperty('prop')).toBe(false);
		expect(copyObj.hasOwnProperty('another')).toBe(true);
	});
});