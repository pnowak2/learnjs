/* tslint:disable:no-unused-variable */

import { ReflectiveInjector, Inject, Optional } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

abstract class Engine {
  abstract sound(): string;
}

class BenzineEngine implements Engine {
  sound() {
    return 'benzine noise..';
  }
}

class DieselEngine implements Engine {
  sound() {
    return 'diesel noise..';
  }
}

class Car {
  constructor(
    @Inject(Engine) public engine: Engine,
    @Inject('V8') public engineAliased: Engine,
    @Inject('Version') public version: string,
    @Inject('Wheels') public wheels: string,
    @Optional() @Inject('Roof') public roof: string
  ) { }

  makeNoise() {
    return this.engine.sound();
  }

  getVersion() {
    return this.version;
  }
}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should use ReflectiveInjector and its resolveAndCreate factory to register dependencies', () => {
    let injector = ReflectiveInjector.resolveAndCreate([
      { provide: Car, useClass: Car },
      { provide: 'V8', useExisting: Engine },
      { provide: Engine, useClass: BenzineEngine },
      { provide: 'Version', useValue: 'Top' },
      { provide: 'Roof', useValue: 'Glass Roof' },
      {
        provide: 'Wheels',
        useFactory: (engine: Engine) => {
          return 'Michelin' + engine.sound()
        },
        deps: ['V8']
      }
    ]);

    let car = injector.get(Car) as Car;

    expect(car.makeNoise()).toEqual('benzine noise..');
    expect(car.getVersion()).toEqual('Top');
    expect(car.engine).toBe(car.engineAliased);
    expect(car.wheels).toEqual('Michelinbenzine noise..');
    expect(car.roof).toEqual('Glass Roof');
  });


  it('should use child injector which will ask parent if child has not registered token for given dependency', () => {
    var injector = ReflectiveInjector.resolveAndCreate([
      { provide: Engine, useClass: BenzineEngine },
    ]);
    var childInjector = injector.resolveAndCreateChild([
      { provide: 'Version', useValue: 'Top' },
      { provide: 'Roof', useValue: 'Glass Roof' },
    ]);

    expect(injector.get(Engine)).toBe(injector.get(Engine));

    expect(injector.get(Engine)).toBe(childInjector.get(Engine));
  });
});
