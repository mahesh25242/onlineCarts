import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReportedAbusesComponent } from './my-reported-abuses.component';

describe('MyReportedAbusesComponent', () => {
  let component: MyReportedAbusesComponent;
  let fixture: ComponentFixture<MyReportedAbusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReportedAbusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReportedAbusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
