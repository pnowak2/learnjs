import { expect } from 'chai';
import * as sinon from 'sinon';

describe('Decorators', () => {
  describe('Simple decorator', () => {
    const spy = sinon.spy();
    
    function myDecorator(target: Person) {
      spy(target);
      expect(target).to.eq(Person);
    }

    @myDecorator
    class Person {

    }
  });
});