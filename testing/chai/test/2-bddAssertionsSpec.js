var expect = require('chai').expect;

describe('bdd assertions', function() {
  it('.not() - negates following assertion', function() {
    expect('peter').not.to.equal('piotr');
  });

  it('.deep - later used by the equal and property assertions', function() {
    var obj = {
      name: 'peter'
    };

    expect(obj).to.deep.equal({
      name: 'peter'
    });
  });

  it('.any - later used in the keys assertion', function() {
    var obj = {
      name: 'peter',
      age: 12,
      sex: 'male'
    };

    expect(obj).to.have.any.keys('name', 'sex', 'other', 'notexisting');
  });

  it('.all - later used in the keys assertion', function() {
    var obj = {
      name: 'peter',
      age: 12,
      sex: 'male'
    };

    expect(obj).to.have.all.keys('name', 'age', 'sex');
  });

  it('.a(type) - language chain or assert values type', function() {
    expect('test').to.be.a('string');
    expect({}).to.be.an('object');
    expect(null).to.be.a('null');
    expect(undefined).to.be.an('undefined');
  });

  it('.include(value) - inclusion of object in array or string', function() {
    expect([1, 2, 3]).to.include(2);
    expect("the text").to.include('text');
  });

  it('.contain(value) - inclusion of object in array or string', function() {
    expect([1, 2, 3]).to.contain(2);
    expect("the text").to.contain('text');
    expect({
      name: 'peter',
      age: 35
    }).to.contain.keys('name', 'age');
  });

  it('.ok() - target is truthy', function() {
    expect('text').to.be.ok;
    expect(1).to.be.ok;
    expect('').not.to.be.ok;
    expect(null).not.to.be.ok;
    expect(undefined).not.to.be.ok;
    expect(false).not.to.be.ok;
  });

  it('.true - target is true', function() {
    expect(true).to.be.true;
    expect(1).not.to.be.true;
  });

  it('.false - target is false', function() {
    expect(false).to.be.false;
    expect(0).not.to.be.false;
  });

  it('.null - asserts that target is null', function() {
    expect(null).to.be.null;
    expect(undefined).to.not.be.null;
  });

  it('.undefined - asserts that target is undefined', function() {
    expect(undefined).to.be.undefined;
    expect(null).to.not.be.undefined;
  });

  it('.exist - asserts that target is neither null or undefined', function() {
    var foo = 'peter',
      bar = null,
      baz;

    expect(foo).to.exist;
    expect(bar).to.not.exist;
    expect(baz).to.not.exist;
  });

  it('.empty - asserts that target length is 0. For objects it takes count of enumerable keys', function() {
    expect([]).to.be.empty;
    expect('').to.be.empty;
    expect({}).to.be.empty;
  });

  it('.arguments - asserts that the target is an arguments object', function() {
    function test() {
      expect(arguments).to.be.arguments;
    }

    test('hello', 'world');
  });

  it('.equal(value) - asserts that the target is strictly equal (===) to value. With deep it does deep comparison (reference is not important)', function() {
    expect('hello').to.equal('hello');
    expect(42).to.equal(42);
    expect({
      foo: 'bar'
    }).to.not.equal({
      foo: 'bar'
    });
    expect({
      foo: 'bar'
    }).to.deep.equal({
      foo: 'bar'
    });
  });

  it('.eql(value) - asserts that the target is deeply equal to value', function() {
    expect({
      foo: 'bar'
    }).to.eql({
      foo: 'bar'
    });
    expect([1, 2, 3]).to.eql([1, 2, 3]);
  });

  it('.above(value) - asserts that the target is greater than value', function() {
    expect(5).to.be.above(2);
    expect([1, 2, 3]).to.have.length.above(1);
  });

  it('.least(value) - asserts that the target is greater than OR equal to value', function() {
    expect(16).to.be.at.least(10);
    expect(10).to.be.at.least(10);
    expect('peter').to.have.length.of.at.least(5);
  });

  it('.below(value) - asserts that the target is less than value', function() {
    expect(5).to.be.below(6);
    expect([1, 2, 3]).to.have.length.below(4);
  });

  it('.most(value) - asserts that the target is less than OR equal to value', function() {
    expect(7).to.be.at.most(16);
    expect(10).to.be.at.most(10);
    expect('peter').to.have.length.of.at.most(5);
  });

  it('.within(start, finish) - asserts that the target is within range', function() {
    expect(7).to.be.within(1, 10);
    expect(7).to.not.be.within(8, 10);
    expect('peter').to.have.length.within(3, 6);
  });

  it('.instanceOf(constructor) - asserts that the target is and instance of constructor', function() {
    var Person = function(name) {
        this.name = name
      },
      peter = new Person('peter');

    expect(peter).to.be.instanceOf(Person);
    expect(peter).to.be.instanceOf(Object);
    expect([1, 2, 3]).to.be.instanceOf(Array);
  });

  describe('.property(name, [value]) - asserts that the target has a property name, optionally also a value (strict equal). Can use deep flag to use dot/bracket notation for nested', function() {
    it('checking for property name [and value]', function() {
      var obj = {
        foo: 'bar'
      }

      expect(obj).to.have.property('foo');
      expect(obj).to.have.property('foo', 'bar');
    });

    it('checking for nested properties [and values]', function() {
      var deepObj = {
        green: {
          tea: 'matcha',
        },
        teas: [{
          tea: 'matcha'
        }, {
          tea: 'konacha'
        }]
      }

      expect(deepObj).to.have.deep.property('green.tea');
      expect(deepObj).to.have.deep.property('teas[1].tea', 'konacha');
    });

    it('checking for nested arrays', function() {
      var arr = [
        ['chai', 'matcha', 'konacha'],
        [{
          tea: 'chai'
        }, {
          tea: 'matcha'
        }, {
          tea: 'konacha'
        }]
      ]

      expect(arr).to.have.deep.property('[0][1]', 'matcha');
      expect(arr).to.have.deep.property('[1][2].tea', 'konacha');
    });

    it('using property changes subject of the assertion to be value of that property', function() {
      var obj = {
        foo: 'bar'
      }

      expect(obj).to.have.property('foo')
        .that.is.a('string')
        .and.has.length(3)
        .and.deep.equals('bar');
    });
  });

  it('.ownProperty(name) - asserts that the target has an own property name', function() {
    expect('test').to.have.ownProperty('length');
  });

  it('.length(value) - asserts that the targets length property has the expected value', function() {
    expect([1, 2, 3]).to.have.length(3);
    expect('peter').to.have.length(5);

    expect('peter').to.have
      .length.above(4)
      .and.below(6);
  });

  it('.match(string) - asserts that the target matches a regular expression', function() {
    expect('peter').to.match(/^pe/);
  });

  it('.string(string) - asserts that the string target ocntains another string', function() {
    expect('peter').to.have.string('ter');
    // same as
    expect('peter').to.contain('ter');
  });

  describe('.keys(key1, [key2], [...]) - asserts that the target contains any or all keys.', function() {

    var obj = {
      foo: 1,
      bar: 2
    }

    it('with any - at least one key must exist in the target object', function() {
      expect(obj).to.have.any.keys('foo', 'baz');
      expect(obj).to.have.any.keys('foo');
      expect(obj).to.contain.any.keys('foo', 'bas');
      expect(obj).to.contain.any.keys(['foo']);
      expect(obj).to.contain.any.keys({foo: 6});
    });

    it('all with contain - target must have at least all passed keys, but can have more', function() {
      expect(obj).to.contain.all.keys('foo');
    });

    it('all with have - target must both contain all passed keys AND number of keys must match number keys passed in', function() {
      expect(obj).to.have.all.keys('foo', 'bar');
      expect(obj).to.have.all.keys({ foo: 'a', bar: 'b'});
    });

    it('default is all', function() {
      expect(obj).to.have.keys('foo', 'bar');
    });
  });

  it('.throw(constructor) - asserts that function throws specific error or type of error', function() {
    var errFn = function () {
      throw new ReferenceError('bad thing')
    }    

    expect(errFn).to.throw(ReferenceError);
    expect(errFn).to.throw(Error);
    expect(errFn).to.throw(/bad thing/);

    expect(function () {
      throw new Error('bad thing');
    }).to.throw(Error);
  });

  it('.respondTo(method) - asserts that the object or class (in prototype) target will respond to a method', function() {
    var Klass = function () {

    } 

    Klass.foo = function () {}

    Klass.prototype.bar = function () {};

    expect(Klass).not.respondTo('foo');
    expect(new Klass).respondTo('bar');
  });

  it('.itself - sets the itself flag used by the respondTo to check if function itself reponds to passed property', function() {
    var Klass = function () {

    } 
    Klass.foo = function () {};

    expect(Klass).itself.respondTo('foo');
  });

  it('.satisfy(method) - asserts that the target passes a given truth test', function() {
    expect(1).to.satisfy(function (num) {
      return num > 0;
    });
  });

  it('.closeTo(expected, delta) - asserts that the target is equal expected within a +/- delta range', function() {
    expect(1.5).to.be.closeTo(1.7, .3);
  });

  it('.members(set) - asserts that the target is a superset of set, or the target and set have the same strictly equal (===) members', function() {
    expect([1, 2, 3]).to.include.members([3, 2]);
    expect([1, 2, 3]).not.to.include.members([3, 2, 8]);

    expect([4, 2]).to.have.members([2, 4]);
    expect([4, 2]).not.to.have.members([2, 4, 5]);

    // deep means comparing deep by value, not by reference
    expect([{ id: 1 }]).to.deep.include.members([{ id: 1 }]);
  });

  it('.change(function) - asserts that a function changes an object property', function() {
    var obj = { val: 10 },
        fn = function () {
          obj.val += 3;
        },
        noChangeFn = function () {
          return 'test'
        }

    expect(fn).to.change(obj, 'val');
    expect(noChangeFn).to.not.change(obj, 'val');
  });

  it('.increase(function) - asserts that a function increases an object property', function() {
    var obj = { val: 10 },
        fn = function () {
          obj.val += 3;
        };

    expect(fn).increase(obj, 'val');
  });

  it('.decrease(function) - asserts that a function decreases an object property', function() {
    var obj = { val: 10 },
        fn = function () {
          obj.val -= 2;
        };

    expect(fn).decrease(obj, 'val');
  });
});

describe('multiple assertions in one chain', function() {
  it('can chain assertions', function() {
    expect('peter'.length)
      .to.eql(5)
      .and.be.below(10)
      .and.to.be.a('number');
  });
});