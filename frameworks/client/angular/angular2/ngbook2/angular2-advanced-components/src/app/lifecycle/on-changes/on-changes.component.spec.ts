/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OnChangesComponent } from './on-changes.component';

describe('OnChangesComponent', () => {
  let component: OnChangesComponent;
  let fixture: ComponentFixture<OnChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
