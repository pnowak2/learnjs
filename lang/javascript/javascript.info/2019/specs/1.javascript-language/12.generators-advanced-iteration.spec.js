describe('12 Generators, advanced iteration', () => {
  describe('12.1 Generators', () => {
    describe('Some features', () => {
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

    describe('Generator as range', () => {
      it('should generate sequence function', () => {
        function* genSeq(from, to) {
          for(let i = from; i <= to; i++) {
            yield i;
          }
        }
  
        expect([...genSeq(5, 9)]).toEqual([5, 6, 7, 8, 9]);
      });
    });

    describe('Symbol iterator with generator', () => {
      it('should make generate sequence object', () => {
        const range = {
          from: 5,
          to: 9,
          *[Symbol.iterator]() {
            for(let i = this.from; i <= this.to; i++) {
              yield i;
            }
          }
        };
  
        expect([...range]).toEqual([5, 6, 7, 8, 9]);
      }); 
    });

    describe('Generator composition', () => {
      it('should compose several genators in one master generator', () => {
        function* seq(start, end) {
          for (let i = start; i <= end; i++) yield i;
        }

        function* master() {
          yield *seq(5, 8);
          yield *seq(12, 15);
        }

        const gen = master();

        expect([...gen]).toEqual([5, 6, 7, 8, 12, 13, 14, 15]);
      });
    });
  });
});
