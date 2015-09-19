describe('block bindings', function() {
  describe('let declarations', function() {
    it('let variable', function() {
      if (true) {
          let value = "blue";
          expect(value).toBeDefined();
      }

      if(true) {
        expect(typeof value).toEqual('undefined')
      }
    });

    it('var variable', function() {
      if (true) {
          var value = "blue";
          expect(value).toBeDefined();
      }

      if(true) {
        expect(value).toBeDefined();
      }
    });
  });

});