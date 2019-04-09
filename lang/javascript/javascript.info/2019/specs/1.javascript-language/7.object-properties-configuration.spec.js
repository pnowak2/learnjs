describe('7 Object Properties Configuration', () => {
  describe('7.1 Property flags and descriptors', () => {
    describe('Object.getOwnPropertyDescriptor(obj, propertyName)', () => {
      it('should return descriptor for object property', () => {
        let user = {
          name: 'peter'
        };

        const descriptor = Object.getOwnPropertyDescriptor(user, 'name');

        expect(descriptor.value).toBe('peter');
        expect(descriptor.configurable).toBe(true);
        expect(descriptor.enumerable).toBe(true);
        expect(descriptor.writable).toBe(true);
      });
    });

    describe('Object.defineProperty(obj, propertyName, descriptor)', () => {
      it('should return descriptor for object property', () => {
        let user = {
          name: 'peter'
        };

        Object.defineProperty(user, 'age', {
          value: 38,
          configurable: false,
          enumerable: false,
          writable: false
        });

        const descriptor = Object.getOwnPropertyDescriptor(user, 'age');

        expect(descriptor.value).toBe(38);
        expect(descriptor.configurable).toBe(false);
        expect(descriptor.enumerable).toBe(false);
        expect(descriptor.writable).toBe(false);
      });

      it('should be read-only', () => {
        let user = {
          name: 'peter'
        };

        Object.defineProperty(user, 'age', {
          value: 38,
          writable: true
        });

        expect(user.age).toEqual(38);
        user.age = 0;
        expect(user.age).toEqual(0);

        Object.defineProperty(user, 'age', {
          value: 38,
          writable: false
        });

        expect(user.age).toEqual(38);
        user.age = 0;
        expect(user.age).toEqual(38);
      });

      it('should be non-enumerable', () => {
        let user = {
          name: 'peter'
        };

        Object.defineProperty(user, 'age', {
          value: 38,
          enumerable: false
        });

        let found = false;
        for (prop in user) {
          if (prop === 'age') {
            found = true;
          }
        }

        expect(found).toBe(false);
        expect(Object.keys(user)).toEqual(['name']);
      });

      it('should be non-configurable. cannot modify/delete', () => {
        let user = {
          name: 'peter'
        };

        Object.defineProperty(user, 'age', {
          value: 38,
          configurable: false
        });

        expect(user.age).toBe(38);

        Object.defineProperty(user, 'name', {
          value: 0,
          writable: false
        });

        delete user.age;

        expect(user.age).toBe(38);
      });
    });

    describe('Object.defineProperty(obj, descriptors)', () => {
      it('should define n properties on object', () => {
        const user = {};
        Object.defineProperties(user, {
          name: { value: 'peter', enumerable: true },
          age: { value: 38, enumerable: false },
        });

        expect(user.name).toEqual('peter');
        expect(user.age).toEqual(38);
        expect(Object.keys(user)).toEqual(['name']);
      });
    });

    describe('Object.getOwnPropertyDescriptors()', () => {
      it('should retrieve all descriptors', () => {
        const user = {};
        Object.defineProperties(user, {
          name: { value: 'peter', enumerable: true, writable: true, configurable: false },
        });

        const descriptors = Object.getOwnPropertyDescriptors(user);

        expect(descriptors['name']).toEqual({
          value: 'peter',
          enumerable: true,
          configurable: false,
          writable: true
        });
      });

      it('should make copy of object INCLUDING flags', () => {
        const user = {};

        Object.defineProperty(user, 'age', {
          value: 38,
          enumerable: false,
          configurable: false,
          writable: false
        });

        let clone = {};
        clone = Object.defineProperties(clone, Object.getOwnPropertyDescriptors(user));

        let property = Object.getOwnPropertyDescriptor(clone, 'age');

        expect(property.value).toEqual(38);
        expect(property.enumerable).toEqual(false);
        expect(property.configurable).toEqual(false);
        expect(property.writable).toEqual(false);
      });
    });

    describe('Sealing an object globally', () => {
      it('should use Object.preventExtensions(obj), to avoid adding properties', () => {
        let user = { name: 'peter' };

        Object.preventExtensions(user);

        user.age = 38;

        expect(user.name).toEqual('peter');
        expect(user.age).toBeUndefined();

        user.name = 'other';
        expect(user.name).toEqual('other');
      });

      it('should use Object.seal(obj) to forbid add/remove properties, configurable = false, for all existing props', () => {
        let user = { name: 'peter' };

        expect(user.name).toEqual('peter');

        Object.seal(user);

        delete user.name; // configuration change

        expect(user.name).toEqual('peter');
      });

      it('should use Object.freeze(obj) to forbid add/remove/change properties, configurable = false, writable = false for all existing props', () => {
        let user = { name: 'peter', age: 38 };

        expect(user.name).toEqual('peter');
        expect(user.age).toEqual(38);

        Object.freeze(user);

        delete user.name; // configuration change
        delete user.age; // configuration change

        user.name = 'other';
        user.age = 2;

        expect(user.name).toEqual('peter');
        expect(user.age).toEqual(38);
      });

      it('should use Object.isExtensible/isSealed/isFrozen to read current status', () => {
        const user = {};
        Object.defineProperties(user, {
          name: { value: 'peter', enumerable: false, writable: false, configurable: false },
        });

        Object.preventExtensions(user);
        Object.seal(user);
        Object.freeze(user);

        expect(Object.isExtensible(user)).toBe(false);
        expect(Object.isSealed(user)).toBe(true);
        expect(Object.isFrozen(user)).toBe(true);
      });
    });
  });

  describe('7.2 Property getters and setters', () => {
    describe('Getters and setters', () => {
      it('should define getter and setter', () => {
        let obj = {
          _name: 'peter',
          get name() {
            return this._name + ' [getter]';
          },
          set name(value) {
            this._name = value + ' [setter]';
          }
        };

        expect(obj.name).toEqual('peter [getter]');
        obj.name = 'other';
        expect(obj.name).toEqual('other [setter] [getter]');
      });

      it('should define with descriptor', () => {
        let obj = {
          _name: 'peter'
        };

        Object.defineProperty(obj, 'name', {
          get() {
            return this._name + ' [getter]';
          },

          set(value) {
            this._name = value + ' [setter]';
          }
        });

        expect(obj.name).toEqual('peter [getter]');
        obj.name = 'other';
        expect(obj.name).toEqual('other [setter] [getter]');
      });
    });
  });
});