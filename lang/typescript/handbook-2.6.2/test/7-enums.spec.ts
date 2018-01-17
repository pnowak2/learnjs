import { expect } from 'chai';

describe('Enums', () => {
  describe('Numeric Enums', () => {
    it('should declare enum', () => {
      enum Direction {
        Up = 1,
        Down,
        Left,
        Right
      };

      expect(Direction.Right).to.eql(4);
    });

    it('should use enum in function declaration', () => {
      enum Direction {
        Up = 1,
        Down,
        Left,
        Right
      };

      function arrowPressed(key: Direction) {
        if (key === Direction.Down) {

        }
      }
    });
  });

  describe('String Enums', () => {
    it('should have all members initialized explicitely', () => {
      enum Direction {
        Up = 'UP',
        Down = 'DOWN',
        Left = 'LEFT',
        Right = 'RIGHT'
      };

      function getDirection(d: Direction) {
        if (d === Direction.Left) { }
        if (d === 'LEFT') { }
        // if (d === 'LEFT2') { } // not allowed, not on the list of enum values
      }
    });
  });

  describe('Computed and Constant Members', () => {
    it('should give example of computed Enums', () => {
      enum FileAccess {
        // constant members
        None,
        Read = 1 << 1,
        Write = 1 << 2,
        ReadWrite = Read | Write,
        // computed member
        G = "123".length
      }
    });
  });

  describe('Enums at Runtime', () => {
    it('should tread enum as object with property (X here below)', () => {
      enum E {
        X, Y, Z
      }

      function f(obj: { X: number }) {
        return obj.X
      }

      expect(f(E)).to.eql(0);
    });
  });

  it('should have reverse mapping feature', () => {
    enum Type {
      Small,
      Big
    }

    const t = Type.Big;
    expect(Type[t]).to.eql('Big');
  });

  it('should have const enums', () => {
    const enum Type {
      Small,
      Big
    }
  });
});
