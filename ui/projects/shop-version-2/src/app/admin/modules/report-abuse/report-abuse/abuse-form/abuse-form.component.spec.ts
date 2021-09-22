import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuseFormComponent } from './abuse-form.component';

describe('AbuseFormComponent', () => {
  let component: AbuseFormComponent;
  let fixture: ComponentFixture<AbuseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbuseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbuseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
