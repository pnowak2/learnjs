var expect = require('chai').expect;
var sinon = require('sinon');

describe('2. JavaScript Fundamentals', function () {
  describe('2.1 Hello, world!', function () {
    it('should read the section', function () { });
  });

  describe('2.2 Code Structure', function () {
    it('should read the section', function () { });
  });

  describe('2.3 The modern mode - "use strict"', function () {
    it('should read the section', function () { });
  });

  describe('2.4 Variables"', function () {
    it('should read the section', function () { });
  });

  describe('2.5 Data types"', function () {
    it('should read the section', function () { });

    describe('typeof', () => {
      it('should behave...', () => {
        expect(typeof 5).to.eql('number')
      });
    });

  });

  describe('2.6 Type Conversions"', function () {
    it('should read the section', function () { });

    describe('ToString', () => {
      it('should convert to string using String()', () => {
        expect(String(5)).to.eql('5');
      });

      it('should convert boolean to string', () => {
        expect(String(false)).to.eql('false');
      });
    });

    describe('ToNumber', () => {
      it('should convert string to numbers for math operations', () => {
        expect('6' / '3').to.eql(2);
      });

      it('should convert to number using Number()', () => {
        expect(Number('123')).to.eql(123);
        expect(typeof Number('123')).to.eql('number');
      });

      it('should convert undefined to NaN', () => {
        expect(Number(undefined)).to.be.NaN;
      });

      it('should convert null to 0', () => {
        expect(Number(null)).to.eql(0);
      });

      it('should convert true to 1', () => {
        expect(Number(true)).to.eql(1);
      });

      it('should convert false to 0', () => {
        expect(Number(false)).to.eql(0);
      });

      it('should convert empty space to 0', () => {
        expect(Number('')).to.eql(0);
      });

      it('should convert "abc" space to NaN', () => {
        expect(Number('abc')).to.eql(NaN);
      });
    });

    describe('ToBoolean', () => {
      it('should convert 1 to true', () => {
        expect(Boolean(1)).to.eql(true);
      });

      it('should convert 0 to false', () => {
        expect(Boolean(0)).to.eql(false);
      });

      it('should empty string to false', () => {
        expect(Boolean('')).to.eql(false);
      });

      it('should nont empty string to true', () => {
        expect(Boolean('abc')).to.eql(true);
      });
    });
  });

  describe('2.7 Operators"', function () {
    it('should read the section', function () { });

    describe('Concatenation with +', () => {
      it('should concatenate strings', () => {
        expect('my' + 'string').to.eql('mystring');
      });

      it('should concatenate string and number converting number to string', () => {
        expect('1' + 2).to.eql('12');
      });

      it('should not concatenate string and number with anything other than plus operator', () => {
        expect('1' - 2).to.eql(-1);
      });
    });

    describe('Unary +', () => {
      it('should do nothing with numbers', () => {
        expect(+5).to.eql(5);
      });

      it('should convert to number for non numbers', () => {
        expect(+'5').to.eql(5);
        expect(+'').to.eql(0);
        expect(+true).to.eql(1);
      });

      it('should sum two strings as numbers (like got them from html inputs)', () => {
        const inp1 = '5';
        const inp2 = '6';

        expect(+inp1 + +inp2).to.eql(11);
      });

    });

    describe('Assignment', () => {
      it('should be possible to chain assignments', () => {
        let a, b, c;
        a = b = c = 2 + 2;

        expect(a).to.eql(4);
        expect(b).to.eql(4);
        expect(c).to.eql(4);
      });

      it('should return value too', () => {
        let x;
        expect(x = 'test').to.eql('test');
      });
    });

    describe('Remainder %', () => {
      it('should return remainder of integer division', () => {
        expect(10 % 3).to.eql(1);
        expect(10 % 2).to.eql(0);
      });
    });

    describe('Exponentiation **', () => {
      it('should work as x^n or Math.pow (i suppose)', () => {
        expect(3 ** 3).to.eql(27);
        expect(Math.pow(3, 3)).to.eql(27);
      });
    });

    describe('Increment / Decrement', () => {
      it('should increment by 1', () => {
        let counter = 2;
        counter++;
        expect(counter).to.eql(3);

        expect(++counter).to.eql(4);
      });

      it('should decrement by 1', () => {
        let counter = 2;
        counter--;
        expect(counter).to.eql(1);

        expect(--counter).to.eql(0);
      });
    });

    describe('Bitwise operators', () => {
      it('should have those operators', () => {
        // AND ( & )
        // OR ( | )
        // XOR ( ^ )
        // NOT ( ~ )
        // LEFT SHIFT ( << )
        // RIGHT SHIFT ( >> )
        // ZERO-FILL RIGHT SHIFT ( >>> )
      });

      it('should increment by 1', () => {
        let reg = 0xf & 0b100;

        expect(reg).to.eql(0x4);
      });
    });

    describe('Modify in Place', () => {
      it('should use shorthand modify in place syntax', () => {
        let n = 2;
        n += 5;

        expect(n).to.eql(7);
      });
    });

    describe('Comma', () => {
      it('should evaluate all expressions, but return only last one', () => {
        expect((1 + 2, 3 + 4)).to.eql(7);
      });
    });
  });

  describe('2.8 Comparisons', () => {
    it('should read the section', function () { });

    describe('Boolean as Result', () => {
      it('should return always boolean', () => {
        expect(2 > 1).to.eql(true);
      });
    });

    describe('String Comparison', () => {
      it('should compare string treating as numbers from ascii (my simplification)', () => {
        expect('Z' > 'A').to.eql(true);
      });

      it('should compare strings char by char', () => {
        // G is the same as G.
        // l is the same as l.
        // o is greater than e. Stop here. The first string is greater.
        expect('Glow' > 'Glee').to.eql(true);
      });
    });

    describe('Comparison of Different Types', () => {
      it('should convert to numbers before compare', () => {
        expect('2' > 1).to.eql(true); // string '2' becomes number first
        expect(true > 0).to.eql(true);
        // because
        expect(Number(true)).to.eql(1);
      });
    });

    describe('Strict equality', () => {
      it('should not use equality check for secure comparisons', () => {
        // works because types are converted to number by == operator
        expect(0 == false).to.be.true;
      });

      it('should use strict equality check for secure comparisons', () => {
        // no type conversion made here below
        expect(0 === false).to.be.false;
      });
    });

    describe('Comparison with Null and Undefined', () => {
      it('should work as expected with strict equality', () => {
        // works because types are converted to number by == operator
        expect(null === undefined).to.be.false;
      });

      it('should NOT work as expected with normal equality', () => {
        // works because types are converted to number by == operator
        expect(null == undefined).to.be.true;

        // even though those are different when converted to number
        expect(Number(null)).to.eql(0);
        expect(Number(undefined)).to.eql(NaN);
      });
    });
  });

  describe('2.9 Interaction alert, prompt, confirm', () => {
    it('should read the section', function () { });
    it('should use alert() to show modal with info', function () { });
    it('should use prompt() to prompt for text value, returns text from field or null', function () { });
    it('should use confirm() to get true / false response', function () { });
  });

  describe('2.10 Conditional Operators: if, "?"', () => {
    it('should read the section', function () { });

    describe('The if statement', () => {
      it('should execute code if returns true condition', () => {
        let year = 2018;
        let is2018 = false;

        if (year === 2018) {
          is2018 = true;
        }

        expect(is2018).to.be.true;
      });
    });

    describe('Boolean Conversion', () => {
      it('should convert if statement to boolean', () => {
        // 0, null, undefined, "" are falsy, according to Boolean() function
        const spy1 = sinon.spy();
        const spy2 = sinon.spy();

        if ('') {
          spy1();
        }

        if ('-1') {
          spy2();
        }
        expect(spy1.notCalled).to.be.true;
        expect(spy2.called).to.be.true;
      });
    });

    describe('Else Clause', () => {
      it('should execute option else block if condition is false', () => {
        const spy1 = sinon.spy();
        const spy2 = sinon.spy();

        if (false) {
          spy1();
        } else {
          spy2();
        }
        expect(spy1.notCalled).to.be.true;
        expect(spy2.called).to.be.true;
      });
    });

    describe('Several Conditions "else if"', () => {
      it('should go to next else if when condition is falsy', () => {
        const spy1 = sinon.spy();
        const spy2 = sinon.spy();
        const spy3 = sinon.spy();

        if (false) {
          spy1();
        } else if (true) {
          spy2();
        } else {

        }
        expect(spy1.notCalled).to.be.true;
        expect(spy2.called).to.be.true;
        expect(spy3.notCalled).to.be.true;
      });
    });

    describe('Ternary operator "?"', () => {
      it('should perform one line if-else and return value', () => {
        const age = 19;

        const who = (age > 18) ? 'adult' : 'kid';

        expect(who).to.eql('adult');
      });

      it('should work with multiple nests', () => {
        const age = 17;

        const who = (age > 18) ? 'adult' :
          age < 16 ? 'baby' : 'teenager';

        expect(who).to.eql('teenager');
      });
    });
  });

  describe('2.11 Logical Operators', () => {
    it('should read the section', function () { });

    describe('|| OR', () => {
      it('should or boolean values', () => {
        expect(true || false).to.be.true;
      });

      it('should convert non boolean to boolean values and return first argument which is truthy', () => {
        expect(1 || 0).to.eql(1);
      });

      it('should seek first truthy value, omit next one - short circuit', () => {
        const spy1 = sinon.spy();
        const spy2 = sinon.spy();

        function getVal1() {
          spy1();
          return true;
        }

        function getVal2() {
          spy2();
          return false;
        }

        expect(getVal1() || getVal2()).to.eql(true);
        expect(spy1.called).to.be.true;
        expect(spy2.notCalled).to.be.true;
      });
    });

    describe('&& AND', () => {
      it('should and boolean values', () => {
        expect(true && false).to.be.false;
      });

      it('should convert non boolean to boolean values and return last argument which is truthy', () => {
        expect(1 && 0).to.eql(0);
      });

      it('should seek first falsy value, omit next one - short circuit', () => {
        const spy1 = sinon.spy();
        const spy2 = sinon.spy();

        function getVal1() {
          spy1();
          return true;
        }

        function getVal2() {
          spy2();
          return false;
        }

        expect(getVal1() && getVal2()).to.eql(false);
        expect(spy1.called).to.be.true;
        expect(spy2.called).to.be.true;
      });
    });

    describe('! NOT', () => {
      it('should negate boolean values', () => {
        expect(!true).to.be.false;
        expect(!1).to.be.false;
      });

      it('should use double !! to convert to boolean', () => {
        expect(!!null).to.be.false;
        expect(!!'a').to.be.true;
      });
    });
  });

  describe('2.12 Loops while and for', () => {
    it('should read the section', function () { });

    describe('while loop', () => {
      it('should use while loop', () => {
        let i = 0;
        while (i <= 3) {
          i += 1;
        }

        expect(i).to.eql(4);
      });

      it('should convert while condition to boolean', () => {
        let i = 3;

        while (i/* when 0, this is false Boolean(0) === false */) {
          i -= 1;
        }

        expect(i).to.eql(0);
      });
    });

    describe('do while loop', () => {
      it('should execute body before first iteration', () => {
        let i = 0;
        const spy = sinon.spy();

        do {
          spy(i);
          i += 1;
        } while (i < 3);

        expect(spy.calledWith(0)).to.be.true;
      });
    });

    describe('for loop', () => {
      it('should iterate over data', () => {
        const spy = sinon.spy();

        for (let i = 0; i < 3; i++) {
          spy(i);
        }

        expect(typeof i).to.eql('undefined');
        expect(spy.calledThrice).to.be.true;
      });

      it('should break the loop', () => {
        let sum = 0;

        while (true) {
          sum += 3;
          if (sum > 10) {
            break;
          }
        }

        expect(sum).to.eql(12);
      });

      it('should continue the loop to next iteration, Helps decrease nesting level', () => {
        let n = 0;

        for (; n < 10; n++) {
          if (n % 2 === 0) {
            continue;
          }
          n += n;
        }

        expect(n).to.eql(15);
      });

      it('should use labels for breaks and continue', () => {
        let sum = 0;

        outer: for (let i = 0; i < 3; i++) {
          for (let i = 0; i < 3; i++) {
            for (let i = 0; i < 3; i++) {
              sum += 1;
              if (sum > 10) {
                break outer;
              }
            }
          }
        }

        expect(sum).to.eql(11);
      });


    });
  });

  describe('2.13 The Switch Statement', () => {
    describe('The Syntax', () => {
      it('should consider many case blocks', () => {
        let v = 2;
        const spy = sinon.spy();

        switch (v) {
          case 1:
            spy(1);
            break;
          case 2:
            spy(2);
            break;
          case 3:
            spy(3);
            break;
          default:
        }

        expect(spy.calledWith(2)).to.be.true;
        expect(spy.calledWith(1)).not.to.be.true;
        expect(spy.calledWith(3)).not.to.be.true;
        expect(spy.calledWith('default')).not.to.be.true;
      });

      it('should continue to other cases plus default too, if no breaks', () => {
        let v = 1;
        const spy = sinon.spy();

        switch (v) {
          case 1:
            spy(1);
          case 2:
            spy(2);
          case 3:
            spy(3);
          default:
            spy('default');
        }

        expect(spy.calledWith(1)).to.be.true;
        expect(spy.calledWith(2)).to.be.true;
        expect(spy.calledWith(3)).to.be.true;
        expect(spy.calledWith('default')).to.be.true;
      });
    });
  });

  describe('2.14 Functions', () => {
    describe('Function Declaration', () => {
      it('should declare simple function', () => {
        function showMessage() {
          return 'hello';
        }

        expect(showMessage()).to.eql('hello');
      });
    });

    describe('Local Variables', () => {
      it('should be visible only inside function', () => {
        function showMessage() {
          let msg = 'hello';
          return msg;
        }

        expect(showMessage()).to.eql('hello');
        expect(typeof msg).to.eql('undefined');
      });
    });

    describe('Outer Variables', () => {
      it('should access them', () => {
        let msg = 'hello';

        function showMessage() {
          return msg;
        }

        expect(showMessage()).to.eql('hello');
        expect(typeof msg).to.eql('string');
      });

      it('should access them and allow modifying them', () => {
        let msg = 'hello';

        function showMessage() {
          msg = 'boo';
          return msg;
        }

        expect(showMessage()).to.eql('boo');
        expect(msg).to.eql('boo');
      });

      it('should shadow same variable if defined inside function', () => {
        let msg = 'hello';

        function showMessage() {
          let msg = 'another';
          return msg;
        }

        expect(showMessage()).to.eql('another');
        expect(typeof msg).to.eql('string');
      });
    })

    describe('Parameters', () => {
      it('should pass arbitrary params to function', () => {
        function showMessage(from, to) {
          return `${from}: ${to}`;
        }

        expect(showMessage('here', 'there')).to.eql('here: there');
      });

      it('should make copy of passed params', () => {
        let from = 'there';

        function showMessage(from, to) {
          from = 'bye';
          return `${from}: ${to}`;
        }

        expect(showMessage('1', '2')).to.eql('bye: 2');
        expect(from).to.eql('there'); // not changed at all!
      });
    });

    describe('Default Values', () => {
      it('should provide default value, instead undefined will be default value', () => {
        function showMessage(greet = 'no text given') {
          return greet;
        }

        function showMessage2(greet) {
          return greet;
        }

        expect(showMessage()).to.eql('no text given');
        expect(showMessage2()).to.be.undefined;
      });

      it('should polyfill old fashion way', () => {
        let text;

        expect(text || 'default').to.eql('default');
      });
    });

    describe('Returning a value', () => {
      it('should never put new line after return, it assumes semicolon ;', () => {
        function msg() {
          return
          'hello';
        }

        expect(msg()).to.be.undefined;
      });
    });

    describe('Naming a function', () => {
      it('should be named after its purpose, should be focues and doing one thing good', () => { });
    });
  });

  describe('2.15 Functions Expressions and Arrows', () => {
    describe('Declaring', () => {
      it('should make function expression', () => {
        let sayHi = function () {
          return 'hello';
        }

        expect(sayHi()).to.eql('hello');
      });

      it('should be a normal variable', () => {
        let sayHi = function () {
          return 'hello';
        }

        let greet = sayHi;

        expect(greet()).to.eql('hello');
      });
    });

    describe('Callback Functions', () => {
      it('should behave...', () => {
        function ask(question, yesFn, noFn) {
          if (question === 'why') {
            noFn();
          } else {
            Yes();
          }
        }

        const spy = sinon.spy();

        ask(
          'why',
          function () { spy('yes'); },
          function () { spy('no'); }
        );

        expect(spy.calledWith('no')).to.be.true;
      });
    });

    describe('Function Expression vs Function Declaration', () => {
      it('should..', () => {
        
      });
    });
  });
});