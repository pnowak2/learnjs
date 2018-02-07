import { expect } from 'chai';

describe('Decorators', () => {
  describe('Introduction', () => {
    it('should add --experimentalDecorators flag to use this feature', () => { });
    it('should compile to ES5 with decorators', () => {
      // tsc --target ES5 --experimentalDecorators
    });
    it('should use tsconfig.json to enable decorators', () => {
      // {
      //   "compilerOptions": {
      //     "target": "ES5",
      //     "experimentalDecorators": true
      //   }
      // }
    });
  });

  describe('Decorators', () => {
    it('should be special kind of declaration attachable to class declaration, method, accessor, property or parameter', () => { });
    it('should be a function which name corresponds to @expression - function expression(){}', () => {

    });
    it('should create @sealed decorator', () => {
      function sealed(target) {
        // do something with 'target'
      }
    });
  });

  describe('Decorator Factories', () => {
    it('should customize how decorator is applied.', () => { });
    it('should be a function which returns expression called by decorator at runtime', () => {
      function color(value: string) {
        return function(target) {
          return `${target} - ${value}`;
        }
      }

      const c = color('red');

      expect(c('mytarget')).to.eql('mytarget - red');
     });
  });
});
