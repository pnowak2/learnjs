import { expect } from 'chai';

describe('Functions', () => {
  describe('Definition', () => {
    it('should define simple function', () => {
      function add(x: number, y: number): number {
        return x + y;
      }

      let myAdd = function (x: number, y: number): number { return x + y };

      expect(add(2, 3)).to.eql(5);
      expect(myAdd(2, 3)).to.eql(5);
    });

    it('should write function type', () => {
      let myAdd: (x: number, y: number) => number;

      myAdd = function add(x: number, y: number): number {
        return x + y;
      };

      expect(myAdd(2, 3)).to.eql(5);
    });
  });

  describe('Inferring the Types', () => {
    it('should infer type by left / right side of the equation', () => {
      // myAdd has the full function type
      let myAdd = function (x: number, y: number): number { return x + y; };

      // The parameters 'x' and 'y' have the type number
      let myOtherAdd: (baseValue: number, increment: number) => number =
        function (x, y) { return x + y; };

      myAdd(2, 5);
      myOtherAdd(2, 5);
    });
  });

  describe('Optional and Default Parameters', () => {
    it('should make some params optional', () => {
      function buildName(firstName: string, lastName?: string) {
        return `${firstName} ${lastName}`;
      }

      expect(buildName('piotr')).to.eql('piotr undefined')
      expect(buildName('piotr', 'nowak')).to.eql('piotr nowak')
    });
  });

  describe('Default Initialized Parameters', () => {
    it('should make some params optional and initialized by default', () => {
      function buildName(firstName: string, lastName: string = 'nowak') {
        return `${firstName} ${lastName}`;
      }

      expect(buildName('piotr')).to.eql('piotr nowak')
      expect(buildName('piotr', 'kowalski')).to.eql('piotr kowalski')
    });
  });

  describe('Rest Parameters', () => {
    it('should be possible to gather rest of params in one variable', () => {
      function buildName(firstName: string, ...restOfName: string[]) {
        return `${firstName} ${restOfName.join(' ')}`;
      }

      expect(buildName('piotr', 'nowak', 'kowalski')).to.eql('piotr nowak kowalski');
    });

    it('should be possible to declare function type with rest params', () => {
      let buildName: (firstName: string, ...restOfName: string[]) => string;

      buildName = function (firstName: string, ...restOfName: string[]) {
        return `${firstName} ${restOfName.join(' ')}`;
      }

      expect(buildName('piotr', 'nowak', 'kowalski')).to.eql('piotr nowak kowalski');
    });

    describe('this', () => {
      it('should see problem with normal function. in inner function this points to global/undefined', () => {
        let deck = {
          suits: ["hearts", "spades", "clubs", "diamonds"],
          cards: Array(52),
          createCardPicker: function () {
            return function () {
              let pickedCard = Math.floor(Math.random() * 52);
              let pickedSuit = Math.floor(pickedCard / 13);

              return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
            }
          }
        }

        let cardPicker = deck.createCardPicker();
        expect(function () {
          let pickedCard = cardPicker();
        }).to.throw();
      });

      it('should fix above the old style', () => {
        let deck = {
          suits: ["hearts", "spades", "clubs", "diamonds"],
          cards: Array(52),
          createCardPicker: function () {
            return function () {
              let pickedCard = Math.floor(Math.random() * 52);
              let pickedSuit = Math.floor(pickedCard / 13);

              return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
            }.bind(this)
          }
        }

        let cardPicker = deck.createCardPicker();
        expect(function () {
          let pickedCard = cardPicker();
        }).not.to.throw();

        expect(cardPicker()).to.be.not.undefined;
      });

      it('should fix with arrow function', () => {
        let deck = {
          suits: ["hearts", "spades", "clubs", "diamonds"],
          cards: Array(52),
          createCardPicker: function () {
            return () => {
              let pickedCard = Math.floor(Math.random() * 52);
              let pickedSuit = Math.floor(pickedCard / 13);

              return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
            }
          }
        }

        let cardPicker = deck.createCardPicker();
        expect(function () {
          let pickedCard = cardPicker();
        }).not.to.throw();
      });


      it('should declare this as type of function argument', () => {
        interface Card {
          suit: string;
          card: number;
        }
        interface Deck {
          suits: string[];
          cards: number[];
          createCardPicker(this: Deck): () => Card;
        }
        let deck: Deck = {
          suits: ["hearts", "spades", "clubs", "diamonds"],
          cards: Array(52),
          // NOTE: The function now explicitly specifies that its callee must be of type Deck
          createCardPicker: function (this: Deck) {
            return () => {
              let pickedCard = Math.floor(Math.random() * 52);
              let pickedSuit = Math.floor(pickedCard / 13);

              return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
            }
          }
        }

        let cardPicker = deck.createCardPicker();
        let pickedCard = cardPicker();

        expect(function () {
          let pickedCard = cardPicker();
        }).not.to.throw();
      });

      it('should mark function type that this object is void / not important', () => {
        interface UIElement {
          addClickListener(onclick: (this: void, e: Event) => void): void;
        }

        class Handler {
          info: string;
          onClickBad(this: Handler, e: Event) {
            this.info = e.currentTarget + '';
          }
          onClickGood(this: void, e: Event) {
          }
        }

        let h = new Handler();
        let ui: UIElement = {
          addClickListener: function () { }
        }

        // ui.addClickListener(h.onClickBad); // Will throw compilation error, callback not compatibile, this needs to be void
        ui.addClickListener(h.onClickGood);
      });
    });

    describe('Overloads', () => {
      it('should allow for overloads, with declaration of types first', () => {
        let suits = ["hearts", "spades", "clubs", "diamonds"];

        function pickCard(x: { suit: string; card: number; }[]): number;
        function pickCard(x: number): { suit: string; card: number; };
        function pickCard(x): any {
          // Check to see if we're working with an object/array
          // if so, they gave us the deck and we'll pick the card
          if (typeof x == "object") {
            let pickedCard = Math.floor(Math.random() * x.length);
            return pickedCard;
          }
          // Otherwise just let them pick the card
          else if (typeof x == "number") {
            let pickedSuit = Math.floor(x / 13);
            return { suit: suits[pickedSuit], card: x % 13 };
          }
        }

        pickCard(5);
        pickCard([{ suit: 'hears', card: 5 }])
      });

    });

  });
});
