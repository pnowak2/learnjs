/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppTesterComponent } from './app-tester.component';

describe('AppTesterComponent', () => {
  let component: AppTesterComponent;
  let fixture: ComponentFixture<AppTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
