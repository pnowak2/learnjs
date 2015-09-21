describe('functions', function() {
	describe('default parameters', function() {
		it('should define some params as default', function() {
			var callbackSpy = jasmine.createSpy();
			var makeRequest = function(url, timeout = 1000, callback = callbackSpy) {
				expect(url).toBe('/url');
				expect(timeout).toBe(1000);
				expect(callback).toBe(callbackSpy);
			}

			makeRequest('/url');
		});

		it('default parameter is used when undefined is passed or omitted', function() {
			var makeRequest = function (url, timeout = 1000) {
				expect(url).toBe('/url');
				expect(timeout).toBe(1000);
			}

			makeRequest('/url', undefined);
		});

		it('could get default parameter as expression', function() {
			var getTimeout = function () { return 2 },
					makeRequest = function (url, timeout = getTimeout()) {
						expect(timeout).toBe(2);
					};

			makeRequest();
		});
	});

	describe('rest parameters', function() {
		it('rest parameters gathered as array', function() {
			var source = {},
					name1 = 'a',
					name2 = 'b',
					pick = function (obj, ...names) {
						expect(obj).toBe(source);
						expect(names).toEqual(jasmine.any(Array));
						expect(names[0]).toBe('a');
						expect(names[1]).toBe('b');
					};

			pick(source, name1, name2);
		});
	});

	describe('arguments object', function() {
		it('changes in function params do not change arguments', function() {
			var mixArgs = function (arg1, arg2) {
				expect(arg1).toBe('a');
				expect(arguments[0]).toBe('a');
				expect(arg2).toBe('b');
				expect(arguments[1]).toBe('b');

				arg1 = 'a2';
				arg2 = 'b2';

				expect(arg1).toBe('a2');
				expect(arguments[0]).toBe('a');
				expect(arg2).toBe('b2');
				expect(arguments[1]).toBe('b');
			}

			mixArgs('a', 'b');
		});
	});

	describe('spread operator - an array is splitted and passed as separate arguments', function() {
		it('should convert array to separate arguments', function() {
			var myMax = function (arg1, arg2, arg3) {
				expect(arg1).toBe('a');
				expect(arg2).toBe('b');
				expect(arg3).toBe('c');
			}

			myMax(...['a', 'b', 'c']);
		});
	});

	describe('function constructor', function() {
		
	});
});
