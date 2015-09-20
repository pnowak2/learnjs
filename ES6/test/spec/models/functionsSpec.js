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

		describe('destructured parameters', function() {
			it('should behave...', function() {
				
			});
		});
	});
});