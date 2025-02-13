/* tslint:disable:no-unused-variable */
import { Convertible } from './convertible';
import { Car } from './car';
import { Engine } from './engine';
import { ReflectiveInjector } from '@angular/core';
import { NO_ERRORS_SCHEMA, EventEmitter } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
  it('should make children injectors', () => {
    const injector = ReflectiveInjector.resolveAndCreate([]);
    const childInjector = injector.resolveAndCreateChild([]);
    const grandChildInjector = childInjector.resolveAndCreateChild([]);
  });

  it('should make children injectors with specific providers', () => {
    const injector = ReflectiveInjector.resolveAndCreate([
      { provide: Car, useClass: Car },
      { provide: Engine, useClass: Engine },
    ]);
    const childInjector = injector.resolveAndCreateChild([]);
    const grandChildInjector = childInjector.resolveAndCreateChild([{
      provide: Car, useClass: Convertible
    }]);

    expect(injector.get(Car)).toEqual(jasmine.any(Car));
    expect(grandChildInjector.get(Car)).toEqual(jasmine.any(Convertible));
    expect(grandChildInjector.get(Engine)).toEqual(jasmine.any(Engine));
  });
    
});
