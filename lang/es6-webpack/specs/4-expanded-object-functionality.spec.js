import { expect } from 'chai';

describe('Expanded object functionality', function() {
  describe('Property initializer shorthand', function() {
    it('should use consize syntax', function() {
      let a = 'ab',
        b = 'bc';

      let obj = {
        a, b
      }

      expect(obj).to.eql({
        a: 'ab',
        b: 'bc'
      })
    });
  });

  describe('Concise methods', function() {
    it('should use shorter syntax', function() {
      var person = {
        name: 'peter',
        sayName() {
          return this.name
        }
      }

      expect(person.sayName()).to.eql('peter');
    });
  });

  describe('Computed property names', function() {
    it('should use dynamic property names', function() {
      var name = 'Name';

      var person = {
        ['prefix' + name]: 'peter'
      }

      expect(person.prefixName).to.eql('peter');
    });
  });

  describe('New Object methods', function() {
    describe('Object.is(arg1, arg2)', function() {
      it('should return true if two arguments are equivalent', function() {
        expect(Object.is(1, 1)).to.be.true;
        expect(Object.is(1, "1")).to.be.false;
        expect(Object.is(NaN, NaN)).to.be.true;
        expect(Object.is(+0, -0)).to.be.false;
      });
    });

    describe('Object.assign(receiver, supplier)', function() {
      it('classic es5 approach', function() {
        function mixin(receiver, supplier) {
          Object.keys(supplier).forEach(function(key) {
            receiver[key] = supplier[key];
          });

          return receiver;
        }

        var receiver = {},
          supplier = {
            name: 'peter',
            say: function() {
              return this.name
            }
          };

        mixin(receiver, supplier);

        expect(receiver.name).to.eql('peter');
        expect(receiver.say()).to.eql('peter');
      });

      it('should assign supplier props to receiver', function() {
        var receiver = {},
          supplier = {
            name: 'peter',
            say: function() {
              return this.name
            }
          };

        Object.assign(receiver, supplier, {
          other: 'boo'
        });

        expect(receiver.name).to.eql('peter');
        expect(receiver.other).to.eql('boo');
        expect(receiver.say()).to.eql('peter');
      });

      it('should allow for duplicate object literal properties', function() {
        var person = {
          name: "Nicholas",
          name: "Greg" // no error in ES6 strict mode
        };
      });
    });
  });

  describe('More powerful prototypes', function() {
    beforeEach(function() {
      this.person = {
        getGreeting() {
          return "Hello";
        }
      };

      this.dog = {
        getGreeting() {
          return "Woof";
        }
      };
    });

    describe('Changing objects prototype', function() {
      it('should get object prototype', function() {
        let friend = Object.create(this.person);
        expect(Object.getPrototypeOf(friend)).to.equal(this.person);
        expect(friend.getGreeting()).to.eql('Hello');
      });

      it('should set object prototype', function() {
        let friend = Object.create(this.person);
        expect(Object.getPrototypeOf(friend)).to.equal(this.person);
        expect(friend.getGreeting()).to.eql('Hello');

        Object.setPrototypeOf(friend, this.dog);
        expect(Object.getPrototypeOf(friend)).to.equal(this.dog);
        expect(friend.getGreeting()).to.eql('Woof');
      });
    });

    describe('Prototype and Super references', function() {
      it('es5 way to call super method', function() {
        let person = {
          getGreeting() {
            return "Hello";
          }
        };

        let dog = {
          getGreeting() {
            return "Woof";
          }
        };


        let friend = {
          getGreeting() {
            // return this.__proto__.getGreeting.call(this) + ', hi!'; // with hidden __proto__ property
            return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
          }
        };

        Object.setPrototypeOf(friend, person);
        expect(friend.getGreeting()).to.eql('Hello, hi!');

        Object.setPrototypeOf(friend, dog);
        expect(friend.getGreeting()).to.eql('Woof, hi!');
      });

      it('es6 way with super (only with formal method syntax)', function() {
        let person = {
          getGreeting() {
            return "Hello";
          }
        };

        let dog = {
          getGreeting() {
            return "Woof";
          }
        };

        let friend = {
          getGreeting() {
            return super.getGreeting() + ", hi!";
          }
        };

        Object.setPrototypeOf(friend, person);
        expect(friend.getGreeting()).to.eql('Hello, hi!');

        Object.setPrototypeOf(friend, dog);
        expect(friend.getGreeting()).to.eql('Woof, hi!');
      });
    });
  });

  describe('Formal method definition', function() {
    it('should use shorthand syntax', function() {
      let person = {
        getGreeting() {
          return 'hello';
        }
      };

      expect(person.getGreeting()).to.eql('hello');
    });

    it('should use super to call prototype method (only with format method definition)', function() {
      let person = {
          getGreeting() {
            return 'hello';
          }
        },
        employee = {
        	getGreeting() {
        		return super.getGreeting() + ', world';
        	}
        };

      Object.setPrototypeOf(employee, person);

      expect(employee.getGreeting()).to.eql('hello, world');

    });
  });
});