describe('9 Classes', () => {
  describe('9.1 Class patterns', () => {
    describe('Functional class pattern', () => {
      it('should make constructor function with private functions/data', () => {
        function User(name) {
          function formatName() {
            return `Hello, ${name}`;
          }

          this.sayHi = function() {
            return formatName();
          };
        }

        const u = new User('Peter');

        expect(u.sayHi()).toEqual('Hello, Peter');
        expect(function() {
          u.formatName();
        }).toThrow();
      });
    });

    describe('Factory class pattern', () => {
      it('should make constructor function with private functions/data', () => {
        function User(name) {
          function formatName() {
            return `Hello, ${name}`;
          }

          return {
            sayHi() {
              return formatName();
            }
          };
        }

        const u = User('Peter');

        expect(u.sayHi()).toEqual('Hello, Peter');
        expect(function() {
          u.formatName();
        }).toThrow();
      });
    });
    
    describe('Prototype-based class pattern', () => {
      it('should make constructor function with private functions/data', () => {
        function User(name) {
          this._name = name;
        }

        User.prototype._formatName = function() {
          return `Hello, ${this._name}`;
        };

        User.prototype.sayHi = function() {
          return this._formatName();
        };

        const u = new User('Peter');

        expect(u.sayHi()).toEqual('Hello, Peter');
        expect(u._formatName).toEqual(jasmine.any(Function));
      });
    });

    describe('Prototype-based inheritance class pattern', () => {
      it('should make constructor function with private functions/data', () => {
        function Mammal(name) {
          this.name = name;
        }

        User.prototype.eat = function() {
          return `${this.name} eats`;
        };

        function User(name) {
          this.name = name;
        }

        User.prototype.talk = function() {
          return `${this.name} talks`;
        };

        User.prototype.__proto__ = Mammal.prototype; 

        const u = new User('Peter');

        expect(u.talk()).toEqual('Peter talks');
        expect(u.eat()).toEqual('Peter eats');
      });
    });
  });
});