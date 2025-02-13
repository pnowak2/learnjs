import { Engine } from './engine';
import { Tires } from './tires';

export class Car {
  public description = 'No DI';

  constructor(public engine: Engine, public tires: Tires) { }

  drive() {
    return `${this.description} car with ` +
      `${this.engine.cylinders} cylinders and ${this.tires.make} tires.`;
  }
}
