import { expect } from 'chai';

describe('Functions', () => {
  describe('Declaration', () => {
    it('should define named function', () => {
      function add(x, y) {
        return x + y;
      }
    });

    it('should define anonymous function', () => {
      let add = function (x, y) {
        return x + y;
      }
    });
  });

  describe('Function Types', () => {
    it('should annotate args and return value with types', () => {
      function add(x: number, y: number): number {
        return x + y;
      }
    });

    it('should omit return value type, it will be inferred', () => {
      function add(x: number, y: number) {
        return x + y;
      }

      const result = add(2, 6);
      result.toFixed; // number
    });


    it('should define function type', () => {
      let add: (x: number, y: number) => number = function (x, y) { return x + y };

      expect(add(2, 4)).to.eql(6);
    });
  });

  describe('Optional and Default Parameters', () => {
    it('should check number of params passed to function', () => {
      function buildName(firstName: string, lastName: string) {
        return firstName + " " + lastName;
      }

      // let result1 = buildName('Bob'); // Incorrect
      // let result2 = buildName('Bob', 'Adams', 'Sr.'); // Incorrect
      let result3 = buildName('Bob', 'Adams'); // Correct
    });

    it('should make some params optional', () => {
      function buildName(firstName: string, lastName?: string) {
        if (lastName) { }
        return firstName + " " + lastName;
      }

      let result1 = buildName('Bob'); // Incorrect
      // let result2 = buildName('Bob', 'Adams', 'Sr.'); // Incorrect
      let result3 = buildName('Bob', 'Adams'); // Correct
    });

    it('should make some params with default value (same behaviour like with optional)', () => {
      function buildName(firstName: string, lastName: string = 'Adams') {
        if (lastName) { }
        return firstName + " " + lastName;
      }

      let result1 = buildName('Bob'); // Incorrect
      // let result2 = buildName('Bob', 'Adams', 'Sr.'); // Incorrect
      let result3 = buildName('Bob', 'Adams'); // Correct
    });
  });

  describe('Rest Parameters', () => {
    it('should capture rest parameters with ...', () => {
      function buildName(firstName: string, ...rest: any[]) {
        return `${firstName} - ${rest.join(',')}`;
      }

      expect(buildName('Piotr', 'Nowak', 26)).to.eql('Piotr - Nowak,26');
    });
  });

  describe('This', () => {
    it('should understand problem of this on example', () => {
      let deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function () {
          return function () {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return { suit: this.suits[pickedSuit], card: pickedCard % 13 }; // this is not defined here..
          }
        }
      }

      // let cardPicker = deck.createCardPicker();
      // let pickedCard = cardPicker();
    });

    it('should fix problem of this on example. Arrow function will capture this in the context.', () => {
      let deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function () {
          return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return { suit: this.suits[pickedSuit], card: pickedCard % 13 }; // this is not defined here..
          }
        }
      }

      let cardPicker = deck.createCardPicker();
      let pickedCard = cardPicker();

      expect(pickedCard).to.have.property('suit');
      expect(pickedCard).to.have.property('card');
    });


    it('make this unusable', () => {
      function fn(this: void) {
        // this.whatever; // this is void, cannot use it without compilation problems.
      }
    });

  });
});