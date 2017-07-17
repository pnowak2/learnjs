// Merging Interfaces

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

// The three interfaces will merge to create a single declaration as so:

// interface Cloner {
//   clone(animal: Dog): Dog;
//   clone(animal: Cat): Cat;
//   clone(animal: Sheep): Sheep;
//   clone(animal: Animal): Animal;
// }


// Merging Namespaces

namespace Animals {
  export class Zebra { }
}

namespace Animals {
  export interface Legged { numberOfLegs: number; }
  export class Dog { }
}

// is equivalent to:

// namespace Animals {
//   export interface Legged { numberOfLegs: number; }

//   export class Zebra { }
//   export class Dog { }
// }
