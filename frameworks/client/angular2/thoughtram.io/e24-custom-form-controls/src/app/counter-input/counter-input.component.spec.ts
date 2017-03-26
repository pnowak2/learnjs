/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CounterInputComponent } from './counter-input.component';

describe('CounterInputComponent', () => {
  let component: CounterInputComponent;
  let fixture: ComponentFixture<CounterInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
