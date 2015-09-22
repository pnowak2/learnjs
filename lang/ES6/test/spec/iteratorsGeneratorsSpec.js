describe('Iterators', function() {

	describe('classical ES5 iterator implementation', function() {
		it('createIterator with next() method and done + value properties ', function() {
			var createIterator = function (items) {
				var i = 0;

				return {
					next() {
						var done = (i >= items.length),
								value = !done ? items[i++] : undefined;
						return {value, done}
					}
				}
			}

			var it = createIterator([1, 2, 3]);

			expect(it.next).toEqual(jasmine.any(Function));

			expect(it.next()).toEqual({
				done: false,
				value: 1
			});

			expect(it.next()).toEqual({
				done: false,
				value: 2
			});

			expect(it.next()).toEqual({
				done: false,
				value: 3
			});

			expect(it.next()).toEqual({
				done: true,
				value: undefined
			});

			expect(it.next()).toEqual({
				done: true,
				value: undefined
			});
		});
	});

	describe('generators', function() {
		it('should behave...', function() {
			
		});
	});
});