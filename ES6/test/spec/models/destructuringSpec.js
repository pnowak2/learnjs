describe('destructuring', function() {

	describe('object destructuring', function() {
		it('assignment syntax with local variable name', function() {
			var options = {
				repeat: true,
				save: false
			}

			var { repeat: localRepeat, save: localSave } = options;

			expect(typeof localRepeat).toEqual('boolean');
			expect(typeof localSave).toEqual('boolean');
			expect(localRepeat).toBe(true);
			expect(localSave).toBe(false);

			expect(typeof repeat).toEqual('undefined');
			expect(typeof save).toEqual('undefined');
		});

		it('assignment syntax with local variable same as in rhs object', function() {
			var options = {
				repeat: true,
				save: false,
			}

			var { repeat, save, other } = options;
			expect(repeat).toBe(true);
			expect(save).toBe(false);
			expect(other).toBeUndefined();
		});

		it('assignment of nested properties', function() {
			var options = {
				nested: {
					name: 'john'
				}
			}

			var { nested: { name } } = options;
			expect(name).toBe('john');
		});	
	});

	describe('array destructuring', function() {
		it('should extract rhs items and assign to lhs as variables', function() {
			var [r, ,b] = ['red', 'green', 'blue'];
			var [,g,] = ['red', 'green', 'blue'];

			expect(r).toBe('red');
			expect(b).toBe('blue');
			expect(g).toBe('green');
		});

		it('extracts nested arrays', function() {
			var nestedArray = [1, 2, [3, 4]];
			var [one, two, [,four]] = nestedArray;

			expect(one).toBe(1);
			expect(two).toBe(2);
			expect(four).toBe(4);
		});
	});

	describe('Mixed destructuring', function() {
		it('should destructure from objects and arrays mixed', function() {
			
		});
	});
});