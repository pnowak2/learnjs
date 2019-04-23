describe('7 Enums', () => {
  describe('Numeric enums', () => {
    it('should make values numeric, ascending integers', () => {
      enum Direction {
        Up = 1, Down, Left, Right
      }

      expect(Direction.Right).toEqual(4);

      let dir: Direction = Direction.Left;
    });

    it('should should initialize items dynamically', () => {
      function getSomeValue() {
        return 1;
      }

      function getAnotherValue() {
        return 2;
      }

      enum E {
        A = getSomeValue(),
        B = getAnotherValue()
      }

      expect(E.A).toEqual(1);
      expect(E.B).toEqual(2);
    });
  });

  describe('String enums', () => {
    it('should be initialized with string literals', () => {
      enum Direction {
        Up = 'UP',
        Down = 'DOWN'
      }
    });
  });

  describe('Computed and constant members', () => {
    it('should use literal enum value in interface', () => {
      enum ShapeKind {
        Circle,
        Square,
      }

      interface Circle {
        kind: ShapeKind.Circle;
        radius: number;
      }

      let c: Circle = {
        kind: ShapeKind.Circle,
        // kind: ShapeKind.Square,
        //    ~~~~~~~~~~~~~~~~ Error!
        radius: 100,
      }
    });

    it('should get enum name', () => {
      enum ShapeKind {
        Circle,
        Square,
      }

      expect(ShapeKind[ShapeKind.Square]).toEqual('Square');
    });
  });
});
