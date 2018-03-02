var expect = require('chai').expect;

describe('4. Objects the Basics', () => {
  describe('4.1 Objects', function () {
    it('should read the section', function () { });

    describe('Creation of Object', () => {
      it('should declare as new Object()', () => {
        let user = new Object();

        expect(user).to.be.an('object');
      });

      it('should declare as literal syntax', () => {
        let user = {};

        expect(user).to.be.an('object');
      });
    });

    describe('Literals and Properties', () => {
      it('should put some props to literal object', () => {
        let user = {
          name: 'Peter',
          age: 38
        };

        expect(user.name).to.eql('Peter');
        expect(user.age).to.eql(38);
      });

      it('should put new props to literal object', () => {
        let user = {
          name: 'Peter',
          age: 38
        };

        user.isAdmin = true;

        expect(user.isAdmin).to.be.true;
      });

      it('should delete props from literal object', () => {
        let user = {
          name: 'Peter',
          age: 38
        };

        expect(user.name).to.eql('Peter');
        
        delete user.name;

        expect(user.name).to.be.undefined;
      });

      it('should use string multi word property names with square brackets', () => {
        let user = {
          name: 'Peter',
          age: 38,
          'likes birds': true
        };

        expect(user['likes birds']).to.be.true;
      });

      it('should use computed properties', () => {
        const prop = 'hello world';

        let user = {
          [prop]: 22
        }

        expect(user[prop]).to.eql(22);
      });

      it('should use property value shorthand', () => {
        const name = 'peter', age = 38;
        var person = {
          name, age
        };

        expect(person.name).to.eql('peter');
        expect(person.age).to.eql(38);
      });
    });

    describe('Existence check', () => {
      it('should check if property exists with undefined', () => {
        let person = {
          name: 'peter'
        }

        expect(person.age).to.eql(undefined);
      });

      it('should check if property exists with "key in object" syntax', () => {
        let person = {
          name: 'peter'
        }

        expect('name' in person).to.be.true;
        expect('age' in person).to.be.false;
      });
    });

    describe('The "for ... in" loop', () => {
      it('should iterate over object properties', () => {
        let user = {
          name: "John",
          age: 30,
          isAdmin: true
        };

        let result = '';
        for(let key in user) {
          result += `${key}|`;
        }

        expect(result).to.eql('name|age|isAdmin|')
      });
    });

    describe('Copying by reference', () => {
      it('should copy by reference', () => {
        let user = { name: 'peter' };
        let admin = user;

        expect(admin.name).to.eql('peter');

        admin.name = 'admin';

        expect(admin.name).to.eql('admin');
      });
    });

    describe('Comparison By Reference', () => {
      it('should behave...', () => {
        let a = {};
        let b = {};
        let c = b;

        expect(a == b).to.eql(false);
        expect(c == b).to.eql(true);
      });
    });

    describe('Const Object', () => {
      it('should be changed', () => {
        const person = {
          name: 'peter'
        };

        person.name = 'other';

        expect(person.name).to.eql('other');
      });
    });

    describe('Cloning and Merging, Object.assign()', () => {
      it('should make copy of object by hand', () => {
        let user = {
          name: 'peter',
          age: 38
        }

        let clone = {};

        for(let key in user) {
          clone[key] = user[key];
        }

        expect(clone.name).to.eql('peter');
        expect(clone.age).to.eql(38);
        expect(user).not.to.equal(clone);
        expect(user == clone).to.be.false;

        clone.name = 'other';

        expect(user.name).to.eql('peter');
        expect(clone.name).to.eql('other');
      });

      it('should make copy of object using Object.assign() (shallow copy only)', () => {
        let user = {
          name: 'peter',
          age: 38
        }

        let clone = Object.assign({}, user);

        expect(clone.name).to.eql('peter');
        expect(clone.age).to.eql(38);
        expect(user).not.to.equal(clone);
        expect(user == clone).to.be.false;

        clone.name = 'other';

        expect(user.name).to.eql('peter');
        expect(clone.name).to.eql('other');
      });

      it('should use Object.assign() to copy properties to object', () => {
        let user = { name: 'peter' };

        let perm1 = { canView: true };
        let perm2 = { canEdit: true };

        let target = Object.assign(user, perm1, perm2);

        expect(target === user).to.be.true;
        expect(user.canView).to.be.true;
        expect(user.canEdit).to.be.true;
      });
    });
  });

  describe('4.2 Garbage Collection', function () {
    it('should read the section', function () { });
  });

});

