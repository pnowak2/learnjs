describe('classes', function() {
	describe('ES5 way', function() {
		it('defines "class" with method', function() {
			function PersonType (name) {
				this.name = name;
			}

			PersonType.prototype.sayName = function () {
				return 'hello ' + this.name
			}

			var p = new PersonType('peter');

			expect(p.name).toBe('peter');
			expect(p.sayName()).toBe('hello peter');
		});
	});

	describe('class declarations', function() {
		it('declares class (methods like in object literals, without commas)', function() {
			class PersonClass {
				constructor(name) {
					this.name = name;
				}

				sayName() {
					return `hello ${this.name}`
				}
			}

			let p = new PersonClass('peter');

			expect(p.name).toBe('peter');
			expect(p.sayName()).toBe('hello peter');
		});
	});
});