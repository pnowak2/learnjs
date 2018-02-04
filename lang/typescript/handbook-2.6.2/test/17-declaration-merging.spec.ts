declare global {
  interface Array<T> {
    toObservable: string;
  }
}

import { expect } from 'chai';

describe('Declaration Merging', () => {
  describe('Basic Concepts', () => {
    it('should read the section', () => {
      // the compiler merges two separate declarations declared with the same name into a single definition. 
      // This merged definition has the features of both of the original declarations. 
      // Any number of declarations can be merged; it’s not limited to just two declarations.      
    });
  });

  describe('Merging Interfaces', () => {
    it('should merge two interfaces to one', () => {
      interface Box {
        height: number;
        width: number;
      }

      interface Box {
        scale: number;
      }

      let box: Box = {
        width: 2,
        height: 5,
        scale: 2
      };
    });

    it('should overload methods', () => {
      class Animal { };
      class Sheep extends Animal { };
      class Dog extends Animal { };
      class Cat extends Animal { };

      interface Cloner {
        clone(animal: Animal): Animal;
      }

      interface Cloner {
        clone(animal: Sheep): Sheep;
      }

      interface Cloner {
        clone(animal: Dog): Dog;
        clone(animal: Cat): Cat;
      }

      let cloner: Cloner;

      // End result is
      //
      // interface Cloner {
      //   clone(animal: Dog): Dog;
      //   clone(animal: Cat): Cat;
      //   clone(animal: Sheep): Sheep;
      //   clone(animal: Animal): Animal;
      // }
    });
  });

  describe('Merging Namespaces', () => {
    it('should read the section', () => {
      // To merge the namespaces, type definitions from exported interfaces declared in each namespace are 
      // themselves merged, forming a single namespace with merged interface definitions inside.  
    });

    it('should merge namespaces', () => {
      // namespace Animals {
      //   export class Zebra { }
      // }

      // namespace Animals {
      //   export interface Legged { numberOfLegs: number; }
      //   export class Dog { }
      // }

      // is equivalent to
      // namespace Animals {
      //   export interface Legged { numberOfLegs: number; }

      //   export class Zebra { }
      //   export class Dog { }
      // }
    });

    it('should not merge not exported members of the namespace', () => {
      // namespace Animal {
      //   let haveMuscles = true;

      //   export function animalsHaveMuscles() {
      //     return haveMuscles;
      //   }
      // }

      // namespace Animal {
      //   export function doAnimalsHaveMuscles() {
      //     return haveMuscles;  // <-- error, haveMuscles is not visible here
      //   }
      // }
    });
  });

  describe('Merging Namespaces with Classes', () => {
    it('should be possible', () => { });
  });

  describe('Module Augmentation', () => {
    it('should augment module with new methods', () => {
      // // observable.ts stays the same
      // // map.ts
      // import { Observable } from "./observable";
      // declare module "./observable" {
      //   interface Observable<T> {
      //     map<U>(f: (x: T) => U): Observable<U>;
      //   }
      // }
      // Observable.prototype.map = function (f) {
      //   // ... another exercise for the reader
      // }


      // // consumer.ts
      // import { Observable } from "./observable";
      // import "./map";
      // let o: Observable<number>;
      // o.map(x => x.toFixed());
    });
  });

  describe('Global Augmentation', () => {
    it('should augment global module', () => {
      // declare global {
      //   interface Array<T> {
      //     toObservable: string;
      //   }
      // }

      Array.prototype.toObservable = 'test';
    });
  });
});
