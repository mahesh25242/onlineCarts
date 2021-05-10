import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationStepOneComponent } from './registration-step-one.component';

describe('RegistrationStepOneComponent', () => {
  let component: RegistrationStepOneComponent;
  let fixture: ComponentFixture<RegistrationStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
