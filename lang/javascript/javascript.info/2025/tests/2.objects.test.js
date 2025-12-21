import { describe, it, expect } from 'vitest';
import { add } from '../src/2.fundamentals/add';

describe('Objects, the basics', () => {
  describe('Objects', () => {
    it('should declare variables', () => {
      let user = new Object()
      let user2 = {}

      expect(user).toBeInstanceOf(Object);
      expect(user2).toBeInstanceOf(Object);
    });

    it('should check literals and props', () => {
      let user = {
        name: 'piotr',
        age: 45
      };

      expect(user.name).toEqual('piotr');
      expect(user['name']).toEqual('piotr');
      expect(user.age).toBe(45);
      expect(user['age']).toBe(45);

      const key = 'name';

      expect(user[key]).toEqual('piotr');
    });

    it('should delete property', () => {
      let user = {
        name: 'piotr',
        age: 45
      };

      expect(user.name).toBeDefined();

      delete user.name;

      expect(user.name).toBeUndefined();
    });

    it('should check computed properties', () => {
      let fruit = 'orange';

      let obj = {
        [fruit]: 'sweet'
      };

      expect(obj.orange).toEqual('sweet');

      let obj2 = {
        ...obj,
        [fruit + 'frt']: 'good'
      }

      expect(obj2.orangefrt).toEqual('good');
    });

    it('should use property value shorthand', () => {
      let name = 'piotr';
      let age = 45;

      let obj = {name, age}

      expect(obj.name).toEqual('piotr');
      expect(obj.age).toBe(45);
    });

    it('should check for property existence', () => {
      let user = {
        name: 'piotr',
        age: 45
      };

      expect('name' in user).toBeTruthy();
      expect('last' in user).toBeFalsy();
    });

    it('should iterate wiht for in loop', () => {
      let user = {
        name: 'piotr',
        age: 45
      };

      let keys = []
      for(let key in user) {
        keys.push(key);
      }

      expect(keys).toEqual(['name', 'age']);
    })
  });
});