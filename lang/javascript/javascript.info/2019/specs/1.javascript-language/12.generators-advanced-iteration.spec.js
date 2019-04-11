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

      it('should be iterable, thus spreadable', () => {
        function* gen() {
          yield 1;
          yield 2;
          yield 3;
        }

        const g1 = gen();
        const g2 = gen();

        let result = '';
        for (let v of g1) {
          result += v;
        }

        expect(result).toEqual('123');
        expect([...g2]).toEqual([1, 2, 3]);
      });
    });

    describe('Generator as range', () => {
      it('should generate sequence function', () => {
        function* genSeq(from, to) {
          for (let i = from; i <= to; i++) {
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
          make(from, to) {
            this.from = from;
            this.to = to;
            return this;
          },
          *[Symbol.iterator]() {
            for (let i = this.from; i <= this.to; i++) {
              yield i;
            }
          }
        };

        expect([...range.make(5, 9)]).toEqual([5, 6, 7, 8, 9]);
      });
    });

    describe('Generator composition', () => {
      it('should compose several genators in one master generator', () => {
        function* seq(start, end) {
          for (let i = start; i <= end; i++) yield i;
        }

        function* master() {
          yield* seq(5, 8);
          yield* seq(12, 15);
        }

        const gen = master();

        expect([...gen]).toEqual([5, 6, 7, 8, 12, 13, 14, 15]);
      });
    });

    describe('yield is a two-way road', () => {
      it('should send value with yield to outside and should outside pass value back to generator as result of yield', () => {
        function* gen() {
          // Pass a question to the outer code and wait for an answer
          let result = yield "2 + 2?"; // (*)
          expect(result).toEqual(4);
        }

        let g = gen();
        let question = g.next(); // <-- yield returns the value
        expect(question).toEqual({ done: false, value: '2 + 2?' });

        let result = g.next(4); // --> pass the result into the generator
        expect(result).toEqual({ done: true, value: undefined });
      });
    });

    describe('Generator.throw', () => {
      it('should be able to pass error to generator and let it handle it', () => {
        const spy = jasmine.createSpy();

        function* gen() {
          try {
            let result = yield "2 + 2?"; // (*)
            fail();
          } catch (e) {
            spy('in catch, ' + e.message);
          }
        }

        const g = gen();
        expect(g.next()).toEqual({ done: false, value: '2 + 2?' });

        g.throw(new Error('boo!'));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('in catch, boo!');
      });
    });
  });

  describe('12.2 Async iteration and generators', () => {
    describe('Async iterators', () => {
      it('should use Symbol.asyncIterator, work on promises and use for-await construction', async () => {
        let range = {
          from: 1,
          to: 5,
          make(from, to) {
            this.from = from;
            this.to = to;
            return this;
          },
          [Symbol.asyncIterator]() {
            return {
              current: this.from,
              last: this.to,
              async next() {
                await new Promise((resolve, reject) => {
                  setTimeout(resolve, 5);
                });

                if (this.current <= this.last) {
                  return { done: false, value: this.current++ };
                } else {
                  return { done: true };
                }
              }
            };
          }
        };

        let result = '';
        for await (let v of range.make(7, 10)) {
          result += v;
        }

        expect(result).toEqual('78910');
      });
    });

    describe('Async generators', () => {
      it('should make async generator', async () => {
        async function* gen(from, to) {
          for (let i = from; i <= to; i++) {
            await new Promise(resolve => setTimeout(resolve, 5));
            yield i;
          }
        }

        const g1 = gen(2, 6);
        const g2 = gen(2, 6);

        const v = await g1.next();
        expect(v).toEqual({ done: false, value: 2 });

        let result = '';
        for await (let v of g2) {
          result += v;
        }

        expect(result).toEqual('23456');
      });
    });
  });
});
