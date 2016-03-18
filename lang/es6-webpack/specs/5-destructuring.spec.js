import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai'

chai.use(sinonChai);

describe('Destructuring', function() {
	describe('object destructuring', function() {
		it('should destructure properties', function() {
			var source = {
				name: 'chai',
				pckg: 'standard'
			}

			let { name, pckg } = source;

			expect(name).to.eql('chai');
			expect(pckg).to.eql('standard');
		});

		it('should assign undefined to non existing property', function() {
			let node = {
				type: 'ID',
				name: 'foo'
			};

			let {type, name, value} = node;

			expect(type).to.eql('ID');
			expect(name).to.eql('foo');
			expect(value).to.be.undefined;
		});

		it('should use default value', function() {
			let node = {
				type: 'ID',
				name: 'foo'
			};

			let {type, name, value = 'default'} = node;

			expect(type).to.eql('ID');
			expect(name).to.eql('foo');
			expect(value).to.eql('default');
		});

		it('should assign to different local variable', function() {
			let node = {
				type: 'ID',
				name: 'foo'
			};

			let { type: localType, name: localName } = node;

			expect(localType).to.eql('ID');
			expect(localName).to.eql('foo');
		});

		it('should use nested destructuring', function() {
			let node = {
				name: 'foo',
				loc: {
					start: {
						line: 1
					}
				}
			};

			let { loc: {start: { line: localLine }}} = node;

			expect(localLine).to.eql(1);
		});

		it('should use array destructuring', function() {
			let colors = ['red', 'green', 'blue'];

			let [first, ,last] = colors;

			expect(first).to.eql('red');
			expect(last).to.eql('blue');
		});

		it('should use destructuring assignment', function() {
			let colors = ['red', 'green', 'blue'],
				first = 'black',
				second = 'purple';

			[first, second] = colors;

			expect(first).to.eql('red');
			expect(second).to.eql('green');
		});

		it('should swap elements', function() {
			let a = 1,
				b = 2;

			[a, b] = [b, a];

			expect(a).to.eql(2);
			expect(b).to.eql(1);
		});

		it('should use nested destructuring', function() {
			let colors = [ "red", [ "green", "lightgreen" ], "blue" ];

			let [first, [, second]] = colors;

			expect(first).to.eql('red');
			expect(second).to.eql('lightgreen');
		});

		it('should use rest items', function() {
			let colors = ['red', 'green', 'blue'];
			let [red, ...rest] = colors;

			expect(red).to.eql('red');
			expect(rest).to.eql(['green', 'blue']);
		});

		it('should use destructured parameters', function() {
			function greet(name, { age, position, boss = 'eac' }) {
				expect(name).to.eql('peter');
				expect(age).to.eql(36);
				expect(position).to.eql('developer');
				expect(boss).to.eql('eac');
			}

			greet('peter', {
				age: 36,
				position: 'developer'
			});
		});
	});
});