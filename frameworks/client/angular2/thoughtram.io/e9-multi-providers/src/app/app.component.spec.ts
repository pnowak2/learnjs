/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { OpaqueToken, ReflectiveInjector, Injector } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should..`, async(() => {
    const SOME_TOKEN: OpaqueToken = new OpaqueToken('SomeToken');
    const injector = ReflectiveInjector.resolveAndCreate([
      { provide: SOME_TOKEN, useValue: 'dependency one', multi: true },
      { provide: SOME_TOKEN, useValue: 'dependency two', multi: true }
    ]);

    expect(injector.get(SOME_TOKEN)).toBeDefined();
    expect(injector.get(SOME_TOKEN)).toEqual(jasmine.any(Array));
    expect(injector.get(SOME_TOKEN).length).toEqual(2);

    expect(injector.get(SOME_TOKEN)[0]).toEqual('dependency one');
    expect(injector.get(SOME_TOKEN)[1]).toEqual('dependency two');
  }));
});
