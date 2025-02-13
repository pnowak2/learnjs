import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectorExampleComponent } from './injector-example.component';

describe('InjectorExampleComponent', () => {
  let component: InjectorExampleComponent;
  let fixture: ComponentFixture<InjectorExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjectorExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectorExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
