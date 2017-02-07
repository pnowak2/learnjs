/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OnpushCmpComponent } from './onpush-cmp.component';

describe('OnpushCmpComponent', () => {
  let component: OnpushCmpComponent;
  let fixture: ComponentFixture<OnpushCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnpushCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnpushCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
