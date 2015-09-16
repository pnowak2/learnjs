describe('Utilities', function() {
  describe('StateUtils', function() {

    var SU = Promz.StateUtils;

    it('should be defined', function() {
      expect(Promz.StateUtils).toEqual(jasmine.any(Object));
    });

    describe('validStates', function() {
      it('should be defined', function() {
        expect(SU.validStates).toEqual({
          PENDING: 0,
          FULFILLED: 1,
          REJECTED: 2
        });
      });
    });

    describe('isValidState', function() {
      it('should have validState', function() {
        expect(SU.isValidState).toEqual(jasmine.any(Function));
      });

      it('should validate only valid states', function() {
        expect(SU.isValidState(SU.validStates.PENDING)).toBe(true);
        expect(SU.isValidState(SU.validStates.FULFILLED)).toBe(true);
        expect(SU.isValidState(SU.validStates.REJECTED)).toBe(true);
      });

      it('should not validate wrong states', function() {
        expect(SU.isValidState('pendin')).toBe(false);
        expect(SU.isValidState('resolved')).toBe(false);
        expect(SU.isValidState('reject')).toBe(false);
      });
    });
  });

  describe('Utils', function() {

    var Utils = Promz.Utils;

    it('should be defined', function() {
      expect(Utils).toEqual(jasmine.any(Object));
    });

    describe('isFunction', function() {
      it('should be defined', function() {
        expect(Utils.isFunction).toEqual(jasmine.any(Function));
      });

      it('should respond with false to non function value', function() {
        expect(Utils.isFunction('test')).toBe(false);
      });

      it('should respond correctly to function value', function() {
        expect(Utils.isFunction(function() {})).toBe(true);
      });
    });

    describe('isObject', function() {
      it('should be defined', function() {
        expect(Utils.isObject).toEqual(jasmine.any(Function));
      });

      it('should respond with false to non object value', function() {
        expect(Utils.isObject('string')).toBe(false);
      });

      it('should respond with true to object value', function() {
        expect(Utils.isObject({})).toBe(true);
      });
    });

    describe('isPromise', function() {
      it('should be defined', function() {
        expect(Utils.isPromise).toEqual(jasmine.any(Function));
      });

      it('should respond with false if value is not promise', function() {
        expect(Utils.isPromise({})).toBe(false);
      });

      it('should respond with true if value is promise', function() {
        expect(Utils.isPromise(new Promz)).toBe(true);
      });
    });

    describe('runAsync', function() {
      it('should be defined', function() {
        expect(Utils.runAsync).toEqual(jasmine.any(Function));
      });

      it('should run function in setTimeout', function() {
        var spy = jasmine.createSpy();
        spyOn(window, 'setTimeout');

        Utils.runAsync(spy)

        expect(window.setTimeout).toHaveBeenCalledWith(spy, 0);
      });
    });
  });
});