describe('12 Iterators and Generators', () => {
  describe('Iterables', () => {
    it('should for..of statement use iterables', () => {
      const arr = [1, 'a', 'b'];
      let result = '';

      for(let item of arr) {
        result += item;
      }

      expect(result).toEqual('1ab');
    });

    it('should for..in return keys instead of values like for..of', () => {
      const arr = [1, 'a', 'b'];
      let result = '';

      for(let item in arr) {
        result += item;
      }

      expect(result).toEqual('012');
    });

    it('should write own iterator', () => {
      const obj = {
        from: 1,
        to: 5,
        *[Symbol.iterator]() {
          for(let i = this.from; i <= this.to; i++) {
            yield i;
          }
        }
      }

      let result = '';
      for(let i of obj) {
        result += i;
      }

      expect(result).toEqual('12345');
    });
  });
});