var expect = require('chai').expect;

describe('Functions', function() {
  describe('default parameter values', function() {
    it('ES5 way', function() {
      var makeRequest = function(url, timeout, callback) {
        url = url || '/test';
        timeout = timeout || 0;

        expect(url).to.equal('/test');
        expect(timeout).to.equal(0);
      };

      makeRequest();
    }) ;

    it('ES6 way', function() {
      let makeRequest = function(url = '/test', timeout = 0, callback = function () {}) {
        expect(url).to.equal('/test');
        expect(timeout).to.equal(0);
      };

      makeRequest();
    });

    it('should use default paremeter expressions', function() {
      function getValue() {
        return 5
      }

      function add(a, b = getValue()) {
        return a + b;
      }

      expect(add(3)).to.equal(8);
    });
  });

  describe('rest parameters', function() {
    it('should gather rest params in array variable', function() {
      function pick(object, ...keys) {
        expect(keys).to.eql([1, 'hello', 2]);
        expect(keys).to.be.an('array');
      }

      pick({}, 1, 'hello', 2);
    });
  });

  describe('spread operator', function() {
    it('should use classical approach', function() {
      expect(Math.max.apply(null, [1, 3, 8])).to.eql(8);
    });

    it('should pass array items as separate arguments to function call', function() {
      expect(Math.max(1, 5)).to.eql(5);
      expect(Math.max(...[1, 3, 8])).to.eql(8);
    });
  });

  describe('should determine how function was called', function() {
    it('ES5 way', function() {
      function Person() {
        if (!(this instanceof Person)) {
          throw new Error();
        }
      }

      expect(function() {
        Person();
      }).to.throw(Error);

      expect(function() {
        new Person();
      }).to.not.throw(Error);
    });

    it('ES6 way 0 new.target metaproperty', function() {
      function Person() {
        if (new.target !== Person) {
          throw new Error;
        }
      }

      expect(function() {
        Person();
      }).to.throw(Error);

      expect(function() {
        new Person();
      }).to.not.throw(Error);
    });
  });

  describe('block level functions', function() {
    it('should be properly scoped', function() {
      if (true) {
        function doSomething() {

        }
        expect(doSomething).to.be.ok;
      }

      expect(typeof doSomething).to.eql('undefined');
    });
  });

  describe('arrow functions', function() {
    describe('should use arrow syntax', function() {
      it('no arguments', function() {
        var getName = () => 'Peter';

        expect(getName()).to.eql('Peter');
      });

      it('no arguments, no return', function() {
        var nop = () => {};

        expect(nop()).to.be.undefined;
      });

      it('one argument and return', function() {
        var reflect = value => value;

        expect(reflect(5)).to.eql(5);
      });

      it('more than one argument', function() {
        var sum = (a, b) => a + b;

        expect(sum(2, 3)).to.eql(5);
      });

      it('traditional body', function() {
        var sum = (a, b) => {
          return a + b;
        }

        expect(sum(2, 3)).to.eql(5);
      });
    });

    describe('IIFE', function() {
      it('should wrap within parenthesis', function() {
        let person = ((name) => {
          return {
            getName() {
              return name;
            }
          }
        })('Peter');

        expect(person.getName()).to.eql('Peter');
      });
    });

    describe('features', function() {
      it('no this binding, this comes from outer context', function() {
        var PageHandler = {
          id: '123456',

          init: function() {
            this.helper = () => {
              return this.doSomething('fake')
            }
          },

          doSomething: function(type) {
            return type;
          }
        }

        PageHandler.init.call(PageHandler);
        expect(PageHandler.helper()).to.eql('fake');
      });

      it('no arguments binding', function() {
        var myfunc = function() {
          expect(arguments[0]).to.eql(1);
        }

        var myarrowfunc = (args) => {
          expect(arguments[0]).to.be.undefined;
        }

        myfunc(1, 2, 3);
        myarrowfunc(1, 2, 3);
      });
    });
  });
});