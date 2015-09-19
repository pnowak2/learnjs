describe('block bindings', function() {
  describe('let declarations', function() {
    it('let variable only accessible in scope', function() {
      if (true) {
          let value = 'blue';
          expect(value).toBeDefined();
      }

      if(true) {
        expect(typeof value).toEqual('undefined')
      }
    });

    it('var variable accessible also outside scope (hoisting)', function() {
      if (true) {
          var value = 'blue';
          expect(value).toBeDefined();
      }

      if(true) {
        expect(value).toBe('blue');
      }
    });

    it('var in for loops is still accessible outside loop', function() {
      for(var i = 0; i < 3; i++) {}
      expect(typeof i).toBeDefined();
    });

    it('let in for loops is not accessible outside loop', function() {
      for(let i = 0; i < 3; i++) {}
      expect(typeof i).toEqual('undefined');
    });
  });

  describe('constants', function() {
    it('constant declaration', function() {
      const maxItems = 30;
      expect(maxItems).toBe(30);
    });

    it('cannot change constant after initialization', function() {
      const maxItems = 30;
      expect(maxItems).toBe(30);
      // maxItems = 0 // is illegal
    });

    it('const available only in local scope', function() {
      if (true) {
          const maxItems = 30;
          expect(maxItems).toBe(30);
      }

      if(true) {
        expect(typeof maxItems).toEqual('undefined')
      }
    });

    it('cannot redefine variable with the same name', function() {
      var myVar = 5;
      //const myVar = 20; // is illegal
      expect(myVar).toBe(5);
    });
  });

});