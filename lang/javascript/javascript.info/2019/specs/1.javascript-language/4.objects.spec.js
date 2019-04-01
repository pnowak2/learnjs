describe('4. Objects, the basics', () => {
  describe('4.1 Objects', () => {
    it('should use two syntaxes', () => {
      let o = {};
      let b = new Object();

      expect(o).toEqual(jasmine.any(Object));
      expect(o).toEqual(jasmine.any(Object));
    });

    it('should put some props inside', () => {
      let o = {
        age: 38
      };

      expect(o.age).toEqual(38);
    });

    it('should remove some props inside', () => {
      let o = {
        age: 38
      };

      expect(o.age).toEqual(38);

      delete o.age;

      expect(o.age).toBeUndefined();
    });

    it('should use multiword keys', () => {
      let o = {
        'hello world': 38
      };

      expect(o['hello world']).toEqual(38);
    });

    it('should use computed properties', () => {
      const key = 'hello world';
      let o = {
        [key]: 38
      };

      expect(o[key]).toEqual(38);
    });

    it('should use property value shorthand', () => {
      const key = 'hej', value = 'jo';
      const o = { key, value };

      expect(o.key).toEqual('hej');
      expect(o.value).toEqual('jo');
    });

    it('should make existency check', () => {
      const o = {
        name: 'peter',
        age: 38
      };

      expect('name' in o).toBe(true);
      expect('gender' in o).toBe(false);
    });

    it('should use for...in loop', () => {
      const o = {
        name: 'peter',
        age: 38
      };

      let props = '';
      let vals = '';
      for (let key in o) {
        props += key;
        vals += o[key];
      }

      expect(props).toEqual('nameage');
      expect(vals).toEqual('peter38');
    });

    it('should compare with ==', () => {
      let a = {};
      let b = {};

      expect(a == b).toBe(false);
      expect(a === b).toBe(false);
    });

    it('should compare with ===', () => {
      let a = {};
      let b = a;

      expect(a === b).toBe(true);
      expect(a == b).toBe(true);
    });

    it('should clone using manual method', () => {
      function clone(obj) {
        let result = {};

        for (let key in obj) {
          result[key] = obj[key];
        }

        return result;
      }

      const o = {
        name: 'peter',
        age: 38
      };

      const copied = clone(o);

      expect(copied.name).toEqual('peter');
      expect(copied.age).toEqual(38);
    });

    it('should clone using Object.assign', () => {
      const o = {
        name: 'peter',
        age: 38
      };

      const copied = {};

      Object.assign(copied, o);

      o.name = 'another';

      expect(copied.name).toEqual('peter');
      expect(copied.age).toEqual(38);
    });

    it('should clone using destructuring', () => {
      const o = {
        name: 'peter',
        age: 38
      };

      const copied = { ...o };

      o.name = 'another';

      expect(copied.name).toEqual('peter');
      expect(copied.age).toEqual(38);
    });
  });

  describe('4.2 Garbage collection', () => {
    it('should read the section', () => { });
  });

  describe('4.3 Symbol type', () => {
    it('should define symbol', () => {
      let s = Symbol();

      expect(s).toEqual(jasmine.any(Symbol));
    });

    it('should define symbol with description (for debug etc)', () => {
      let s = Symbol('mine');

      expect(s).toEqual(jasmine.any(Symbol));
      expect(s.description).toEqual('mine');
      expect(s.toString()).toEqual('Symbol(mine)');
    });

    it('should be unique, always', () => {
      let s1 = Symbol('id');
      let s2 = Symbol('id');

      expect(s1 != s2).toBe(true);
      expect(s1 == s2).toBe(false);
    });

    it('should create global symbol with Symbol.for(string)', () => {
      const s1 = Symbol.for('id');
      const s2 = Symbol.for('id');

      expect(s1 === s2).toBe(true);
    });

    it('should create hidden properties', () => {
      let sName = Symbol('name');

      const o = {
        [sName]: 'hidden'
      };

      expect(o[sName]).toEqual('hidden');
      expect(o['name']).toBeUndefined();
    });

    it('should skip symbols in for...in', () => {
      const iden = Symbol('id');

      const o = {
        name: 'obj',
        [iden]: 'hash'
      };

      let result = '';

      for (k in o) {
        result += o[k];
      }

      expect(result).toEqual('obj');
    });

    it('should copy also symbols using Object.assign()', () => {
      const iden = Symbol('id');

      const o = {
        name: 'obj',
        [iden]: 'hash'
      };

      const copy = Object.assign({}, o);

      expect(copy[iden]).toEqual('hash');
    });

    it('should get key for global symbol', () => {
      const s1 = Symbol.for('id');
      const s2 = Symbol('id');

      expect(Symbol.keyFor(s1)).toEqual('id');
      expect(Symbol.keyFor(s2)).toBeUndefined();
    });

  });

  describe('4.4 Object methods - this', () => {
    it('should behave...', () => {
      
    });
  });
});
