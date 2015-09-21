describe('Chapter 7', function() {
	it('should be literal singleton', function() {
		var obj = {
			myProp: 'my value'
		}

		var obj2 = {
			myProp: 'my value'
		}

		var copyObj = Object.create(obj);

		expect(obj).not.toBe(copyObj);
		expect(obj).not.toBe(obj2);
	});

	it('should be singleton using new keyword', function() {
		var Universe = function () {
			var instance = this;

			Universe = function () {
				return instance;
			}

			return instance;
		},
			uni = new Universe(),
			uni2 = new Universe();

		expect(uni).toBe(uni2);
		expect(uni.instance).toBeUndefined();
		expect(Universe.instance).toBeUndefined();
	});

	it('should be factory', function() {

		var CarMaker = function () {}

		CarMaker.prototype.drive = function () {
			return 'Drive, Im ' + this.brand;
		}

		CarMaker.factory = function (type) {

			var newCar;

			if(typeof CarMaker[type] === 'function') {
				var F = function () {};
				F.prototype = CarMaker.prototype;
				CarMaker[type].prototype = new F();
				CarMaker[type].prototype.constructor = CarMaker[type];
				CarMaker[type].uber = CarMaker.prototype;
				newCar = new CarMaker[type];
			}

			return newCar;
		}

		CarMaker.Corolla = function () {
			this.brand = 'Corolla';
		}

		CarMaker.Jeep = function () {
			this.brand = 'Jeep';
		}

		var corolla = CarMaker.factory('Corolla');
		var jeep = CarMaker.factory('Jeep');

		expect(corolla).toBeDefined();
		expect(corolla.drive).toBeDefined();
		expect(corolla.drive()).toBe('Drive, Im Corolla');

		expect(jeep.drive()).toBe('Drive, Im Jeep');
	});

	it('should be iterator', function() {

		var callbackSpy = jasmine.createSpy('callbackFunction')

		var agg = (function () {

			var data = [1, 2, 3, 4, 5],
				length = data.length,
				i = 0;

			return {
				hasNext: function () {
					return i < length
				},
				next: function () {
					var element = null;
					if(this.hasNext()) {
						element = data[i];
					}
					i = i + 1;
					return element;
				},
				index: function () {
					return i;
				}
			}
		})();

		while(agg.hasNext()) {
			agg.next();
			callbackSpy(agg.index());
		}

		expect(callbackSpy.calls.count()).toBe(5);
		expect(callbackSpy.calls.mostRecent().args[0]).toBe(5);
		expect(callbackSpy.calls.argsFor(3)).toEqual([4]);
	});
});