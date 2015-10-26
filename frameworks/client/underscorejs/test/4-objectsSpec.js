var expect = require('chai').expect;
var sinon = require('sinon');
var _ = require('underscore');

describe('objects', function() {
	it('_.keys(object) - Retrieve all the names of the objects own enumerable properties', function() {
		var Parent = function () {
			this.surname = 'nowak';
			this.age = 35;
		};
		Parent.prototype.parentProp = 'parent';
		var o = new Parent();

		expect(o).to.have.ownProperty('surname');
		expect(o).to.have.ownProperty('age');

		expect(o).to.have.property('parentProp');
		expect(o).to.not.have.ownProperty('parentProp');

		expect(_.keys(o)).to.be.length(2);
		expect(_.keys(o)).to.eql(['surname', 'age']);
	});

	it('_.allKeys(object) - Retrieve all the names of objects own and inherited properties', function() {
		var Parent = function () {
			this.surname = 'nowak';
			this.age = 35;
		};
		Parent.prototype.parentProp = 'parent';
		var o = new Parent();

		expect(_.allKeys(o)).to.eql(['surname', 'age', 'parentProp']);
	});

	it('_.values(object) - Return all of the values of the objects own properties', function() {
		var obj = { name: 'peter', age: 35 };

		expect(_.values(obj)).to.eql(['peter', 35]);
	});

	it('_.mapObject(object, iteratee, [context]) - Like map, but for objects. Transform the value of each property in turn', function() {
		var obj = { name: 'peter', surname: 'nowak' },
				result = _.mapObject(obj, function (val, key) {
					return val + '-mapped';
				});

		expect(result).to.eql({
			name: 'peter-mapped',
			surname: 'nowak-mapped'
		})
	});

	it('_.pairs(object) - Convert an object into a list of [key, value] pairs', function() {
		var result = _.pairs({ one: 1, two: 2, three: 3});

		expect(result).to.eql([
			['one', 1],
			['two', 2],
			['three', 3],
		])
	});

	it('_.invert(object) - Returns a copy of the object where the keys have become the values and the values the keys', function() {
		var result = _.invert({ one: 1, two: 2, three: 3});

		expect(result).to.eql({
			1: 'one',
			2: 'two',
			3: 'three'
		})
	});

	it('_.create(prototype, props) - Creates a new object with the given prototype, optionally attaching props as own properties. Basically, Object.create, but without all of the property descriptor jazz', function() {
		var Parent = function () {};
		Parent.prototype.parentProp = 'parent';

		var child = _.create(Parent.prototype, {
			surname: 'nowak',
			age: 35
		});

		expect(child).to.have.ownProperty('surname');
		expect(child).to.have.ownProperty('age');

		expect(child).to.have.property('parentProp');
		expect(child).to.not.have.ownProperty('parentProp');

		expect(_.keys(child)).to.eql(['surname', 'age']);
	});

	it('_.functions(object), aliast _.methods - Returns a sorted list of the names of every method in an object — that is to say, the name of every function property of the object', function() {
		var obj = {
			methodA: function () {},
			methodB: function () {},
			methodC: function () {}
		};

		expect(_.functions(obj)).to.eql(['methodA', 'methodB', 'methodC']);
		expect(_.methods(obj)).to.eql(['methodA', 'methodB', 'methodC']);
	});

	it('_.findKey(object, predicate, [context]) - Similar to _.findIndex but for keys in objects. Returns the key where the predicate truth test passes or undefined', function() {
			var obj = {
				one: 1,
				two: 2,
				three: 3
			}

			expect(_.findKey(obj, function (val, key) {
				return val === 2;
			})).to.eql('two');
	});

	it('_.extend(destination, *sources) - Copy all of the properties in the source objects over to the destination object, and return the destination object. Its in-order, so the last source will override properties of the same name in previous arguments', function() {
		var result = _.extend({}, {name: 'peter'}, {age: 35});

		expect(result).to.have.ownProperty('name');
		expect(result).to.have.ownProperty('age');

		expect(result).to.have.property('name', 'peter');
		expect(result).to.have.property('age', 35);
	});

	it('_.extendOwn(destination, *sources), alias _.assign - Like extend, but only copies own properties over to the destination object', function() {
		var Parent = function () {
			this.surname = 'nowak';
			this.age = 35;
		};
		Parent.prototype.parentProp = 'parent';
		var o = new Parent();

		var result = _.extendOwn({}, o);

		expect(result).to.have.ownProperty('surname');
		expect(result).to.have.ownProperty('age');
		expect(result).to.not.have.property('parentProp');
	});

	it('_.pick(object, *keys) - Return a copy of the object, filtered to only have values for the whitelisted keys (or array of valid keys). Alternatively accepts a predicate indicating which keys to pick', function() {
		var obj = {name: 'moe', age: 50, userid: 'moe1'},
				result = _.pick(obj, 'name', 'userid');

		expect(result).to.eql({
			name: 'moe',
			userid: 'moe1'
		});
	});

	it('_.omit(object, *keys) - Return a copy of the object, filtered to omit the blacklisted keys (or array of keys). Alternatively accepts a predicate indicating which keys to omit', function() {
		var obj = {name: 'moe', age: 50, userid: 'moe1'},
				result = _.omit(obj, 'name', 'userid');

		expect(result).to.eql({
			age: 50
		});	
	});

	

});