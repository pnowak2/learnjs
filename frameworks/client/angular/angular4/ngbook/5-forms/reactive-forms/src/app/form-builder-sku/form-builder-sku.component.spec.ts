import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderSkuComponent } from './form-builder-sku.component';

describe('FormBuilderSkuComponent', () => {
  let component: FormBuilderSkuComponent;
  let fixture: ComponentFixture<FormBuilderSkuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBuilderSkuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
