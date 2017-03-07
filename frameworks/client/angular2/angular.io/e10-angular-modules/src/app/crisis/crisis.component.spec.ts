/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrisisComponent } from './crisis.component';

describe('CrisisComponent', () => {
  let component: CrisisComponent;
  let fixture: ComponentFixture<CrisisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrisisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
