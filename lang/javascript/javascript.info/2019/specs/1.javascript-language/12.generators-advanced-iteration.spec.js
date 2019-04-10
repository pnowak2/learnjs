describe('12 Generators, advanced iteration', () => {
  describe('12.1 Generators', () => {
    it('should use star syntax', () => {
      function* gen() {
        yield 1;
        yield 2;
        return 3;
      }

      const g = gen();

      expect(g.next()).toEqual({ done: false, value: 1 });
      expect(g.next()).toEqual({ done: false, value: 2 });
      expect(g.next()).toEqual({ done: true, value: 3 });
      expect(g.next()).toEqual({ done: true, value: undefined });
    });

    it('should be iterable', () => {
      function* gen() {
        yield 1;
        yield 2;
        yield 3;
      }

      const g1 = gen();
      const g2 = gen();

      let result = '';
      for(let v of g1) {
        result += v;
      }

      expect(result).toEqual('123');
      expect([...g2]).toEqual([1, 2, 3]);
    });
  });
});