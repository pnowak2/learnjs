import { expect } from 'chai';

describe('Advanced Types', () => {
  describe('Intersection Types', () => {
    it('should combine multiple types into one', () => {
      function extend<T, U>(first: T, second: U): T & U {
        let result = <T & U>{};

        for (let id in first) {
          (<any>result)[id] = (<any>first)[id];
        }

        for (let id in second) {
          if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
          }
        }

        return result;
      }

      class Person {
        constructor(public name: string) { }
      }
      interface Loggable {
        log(): void;
      }
      class ConsoleLogger implements Loggable {
        log() {
          // ...
        }
      }

      let jim = extend(new Person('jim'), new ConsoleLogger());
      jim.log;
      jim.name;
    });
  });

  describe('Union Types', () => {
    it('should declare union types with pipe |', () => {
      function padLeft(value: string, padding: string | number) {
        padding = 5;
        padding = '';
      }
    });

    it('should provide another example, where only common props will be accessible', () => {
      interface Bird {
        fly();
        layEggs();
      }

      interface Fish {
        swim();
        layEggs();
      }

      function getSmallPet(): Fish | Bird {
        return null;
      }

      let pet = getSmallPet();
      pet.layEggs(); // okay
      // pet.swim();    // errors, not common property to both interfaces
    });
  });


  describe('Type Guards', () => {

    it('should declare user defined type guard', () => {
      interface Bird {
        fly();
        layEggs();
      }

      interface Fish {
        swim();
        layEggs();
      }

      function isFish(pet: Fish | Bird): pet is Fish /* <= this is type predicate */ {
        return (<Fish>pet).swim !== undefined;
      }

      function getSmallPet(): Fish | Bird {
        return null;
      }

      let pet = getSmallPet();
      
      if (isFish(pet)) { // only possible because of above :pet is Fish
        pet.swim();
      }
      else {
        pet.fly();
      }
    });

  });

});