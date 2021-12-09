import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAbuseComponent } from './view-abuse.component';

describe('ViewAbuseComponent', () => {
  let component: ViewAbuseComponent;
  let fixture: ComponentFixture<ViewAbuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAbuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAbuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
