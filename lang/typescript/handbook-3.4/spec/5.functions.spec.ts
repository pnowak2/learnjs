describe('5 Functions', () => {
  describe('Function Types', () => {
    it('should declare simple function', () => {
      function add(x: number, y: number): number {
        return x + y;
      }

      let myAdd = function (x: number, y: number): number {
        return x + y;
      }
    });

    it('should write the function type', () => {
      let myAdd: (x: number, y: number) => number =
        function (x: number, y: number): number {
          return x + y;
        }
    });
  });

  describe('Optional and Default Parameters', () => {
    it('should make param optional', () => {
      function buildName(first: string, last?: string) {
        if (last) {
          return `${first} ${last}`;
        } else {
          return first;
        }
      }

      expect(buildName('peter', 'nowak')).toEqual('peter nowak');
      expect(buildName('peter')).toEqual('peter');
    });

    it('should make param default value', () => {
      function buildName(first: string, last: string = 'kowalski') {
        if (last) {
          return `${first} ${last}`;
        } else {
          return first;
        }
      }

      expect(buildName('peter', 'nowak')).toEqual('peter nowak');
      expect(buildName('peter')).toEqual('peter kowalski');
    });
  });

  describe('Rest parametres', () => {
    it('should behave...', () => {
      function buildName(first: string = 'adam', ...rest: string[]) {
        return [first, ...rest]
          .filter(item => item)
          .join(' ');
      }

      expect(buildName('peter', 'andrew', 'nowak')).toEqual('peter andrew nowak');
      expect(buildName('peter', 'nowak')).toEqual('peter nowak');
      expect(buildName('peter')).toEqual('peter');
      expect(buildName()).toEqual('adam');
    });
  });

  describe('this', () => {
    it('should arrow function now have own this', () => {
      const deck = {
        suits: ['hearts'],
        createCardPicker: function () {
          return () => {
            return this.suits[0];
          }
        }
      }

      expect(deck.createCardPicker()()).toEqual('hearts');
    });

    it('should make using this in function body useless', () => {
      function fn(this: void) {
        return this;
      }

      expect(fn()).toBeUndefined();
    });
  });

  describe('Overloads', () => {
    it('should first declare functions, then below make agnostic implementation', () => {
      function fn(x: number): number;
      function fn(x: string): string;

      function fn(x: any): any {
        if(typeof x === 'number') {
          return 5;
        } else {
          return 'test'
        }
      }

      expect(fn(3)).toEqual(5);
      expect(fn('abc')).toEqual('test');
    });
  });
});