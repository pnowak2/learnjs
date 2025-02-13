/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubComponent } from './sub.component';

describe('SubComponent', () => {
  let component: SubComponent;
  let fixture: ComponentFixture<SubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
