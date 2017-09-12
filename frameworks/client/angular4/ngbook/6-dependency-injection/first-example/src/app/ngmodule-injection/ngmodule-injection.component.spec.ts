import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgmoduleInjectionComponent } from './ngmodule-injection.component';

describe('NgmoduleInjectionComponent', () => {
  let component: NgmoduleInjectionComponent;
  let fixture: ComponentFixture<NgmoduleInjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgmoduleInjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgmoduleInjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
