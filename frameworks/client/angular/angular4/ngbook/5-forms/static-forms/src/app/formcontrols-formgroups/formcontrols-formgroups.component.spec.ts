import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcontrolsFormgroupsComponent } from './formcontrols-formgroups.component';

describe('FormcontrolsFormgroupsComponent', () => {
  let component: FormcontrolsFormgroupsComponent;
  let fixture: ComponentFixture<FormcontrolsFormgroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormcontrolsFormgroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcontrolsFormgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
