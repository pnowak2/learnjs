describe("Chapter 2-4", function () {
  it("should have 2 own properties", function () {
    var obj = {
        name: 'my name',
        age: 12
      },
      hasOwn = Object.prototype.hasOwnProperty,
      o;

    for (o in obj) {
      expect(hasOwn.call(obj, o)).toBeTruthy(o);
    }
  })

  it("should !! be false", function () {
    expect(!!"").toBe(false);
  })

  it("should !! be truth", function () {
    expect(!!"test").toBe(true);
  })

  it("should empty string be falsy", function () {
    expect("").toBeFalsy(false);
  })

  it("should properly parseInt()", function () {
    var monthStr = "09",
      parsedMonth = parseInt(monthStr, 10);

    expect(parsedMonth).toBe(9);
  })

  it("should create object from Constructor function", function () {
    var Person = function (name) {
        this.name = name;
        this.say = function () {
          return "I am " + this.name;
        }
      },
      adam = new Person("Adam");

    expect(adam.say).toBeDefined();
    expect(adam.say()).toBe("I am Adam");
  })

  it("should create object from Constructor function and use prototype method", function () {
    var Person = function (name) {
        this.name = name;
      },
      adam = new Person("Adam");

    Person.prototype.say = function () {
      return "I am " + this.name;
    }

    expect(adam.say).toBeDefined();
    expect(adam.say()).toBe("I am Adam");
  })

  it('should return object from constructor', function () {
    var ObjectMaker = function () {

      var myfunc = function () {
        return 'test';
      }

      var that = {
        name: 'that',
        func: myfunc
      };

      return that;
    }

    var obj = new ObjectMaker();
    expect(obj.name).toBe('that');
    expect(obj.func()).toBe('test');
  });

  it('should check for global while invoking constructor function without new', function () {
    var Person = function (name) {
      if (!(this instanceof Person)) {
        return new Person(name);
      }

      this.name2 = name;
    };

    var adam = Person("Adam2");

    expect(adam).toBeDefined();
    expect(adam.name2).toBe("Adam2");
    expect(window.name2).toBeUndefined();

  });

  it('should check for arrayness', function () {
    var array = [1, 2, 3];

    expect(typeof (array)).toBe('object');
    expect(Object.prototype.toString.call(array)).toBe('[object Array]');

    Array.isArr = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }

    expect(Array.isArr(array)).toBe(true);
  });

  it('should parse and stringify JSON', function () {
    var parsed = JSON.parse('{ "name": "john" }');
    expect(parsed.name).toBe('john');

    expect(JSON.stringify(parsed)).toBe('{"name":"john"}');
  });

  it('should use regular expression syntax', function () {
    var regExp = /^\d+$/g
    expect('552').toMatch(regExp);
    expect('552d').not.toMatch(regExp);
  });

  it('should throw error object', function () {
    expect(function () {
      throw new Error('blad');
    }).toThrowError()
  });

  it('should create clousre with incrementer', function () {
    var setup = function () {
      var i = 1;
      return function () {
        return i++;
      }
    }

    var next = setup();

    expect(typeof next).toBe('function');

    for (var i = 1; i <= 30; i++) {
      expect(next()).toBe(i);
    }

  });

  it('should self define function', function () {
    var myFunction = function () {
      myFunction = function () {
        return 'second'
      }
      return 'first';
    }

    expect(myFunction()).toBe('first');
    expect(myFunction()).toBe('second');
  });

  it('should use immediate function', function () {
    var spy = jasmine.createSpy('immediate invocation');
    (function () {
      spy();
    })();

    expect(spy).toHaveBeenCalled();
  });

  it('should return value from immediate function', function () {
    var result = (function () {
      var i = 5;
      i++;
      i++;
      return i;
    })();

    var global = (function () {
      return this
    })();

    expect(result).toBe(7);
    expect(global.i).not.toBeDefined();
  });

  it('should do immediate object initialization', function () {
    var spy = jasmine.createSpy();

    ({
      name: 'adam',
      init: spy
    }).init();

    expect(spy).toHaveBeenCalled();
  });

  it('should use memoization', function () {

    var spy = jasmine.createSpy('spy');

    var routine = function (param) {
      routine.cache = routine.cache || {};
      if (!routine.cache[param]) {
        spy(param);
        routine.cache[param] = param * param;
      }
      return routine.cache[param];
    }

    expect(routine(2)).toBe(4)
    expect(routine(2)).toBe(4)
    expect(routine(3)).toBe(9)
    expect(routine(3)).toBe(9)
    expect(routine(7)).toBe(49)
    expect(routine(7)).toBe(49)
    expect(routine(13)).toBe(169)

    expect(spy.calls.count()).toBe(4);
  });

  it('should use configuration object', function () {
    var f = function (conf) {
      return {
        a: '1' + conf.a,
        b: '2' + conf.b
      }
    }

    expect(f({
      a: "a",
      b: "b"
    })).toEqual({
      a: '1a',
      b: '2b'
    });
  });

  it('should curry function', function () {
    var add = function (a, b) {
      return a + b;
    }

    var curry = function (fun) {
      var slice = Array.prototype.slice,
        oldArgs = slice.call(arguments, 1);

      return function () {
        var newArgs = slice.call(arguments),
          args = oldArgs.concat(newArgs);

        return fun.apply(null, args);
      }
    }

    var add2 = curry(add, 2);

    expect(add2(5)).toBe(7);
    expect(add2(22)).toBe(24);
  });
});