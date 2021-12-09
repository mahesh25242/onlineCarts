import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedAbusesComponent } from './reported-abuses.component';

describe('ReportedAbusesComponent', () => {
  let component: ReportedAbusesComponent;
  let fixture: ComponentFixture<ReportedAbusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportedAbusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedAbusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
