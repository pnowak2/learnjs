describe('8 Type Inference', () => {
  describe('Basics', () => {
    it('should infer basic type', () => {
      let x = 10 / 3;
      expect(x.toFixed(2)).toEqual('3.33');
    });
  });

  describe('Best common type', () => {
    it('should be array of base common types if found', () => {
      class Animal { };
      class Rhino extends Animal { };
      class Elephant extends Animal { };
      class Snake extends Animal { };

      let zoo: Array<Animal> = [new Rhino(), new Elephant(), new Snake()];
    });

    it('should be array with union of separate items if no common type is found', () => {
      let x: Array<number | null> = [0, 1, null];
    });
  });

  describe('Contextual Typing', () => {
    it('should get type from context, here event type is known', () => {
      window.onmousedown = function (evt /* MouseEvent known by compiler here */) {
        evt.button;
      }

      window.onscroll = function (evt /* MouseEvent known by compiler here */) {
        evt.defaultPrevented;
      }
    });

    it('should make "any" type if context does not provide hint', () => {
      const handler = function (uiEvent /* any */) {
        console.log(uiEvent.button);
      }
    });
  });
});