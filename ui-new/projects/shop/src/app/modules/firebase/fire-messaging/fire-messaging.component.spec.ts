import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireMessagingComponent } from './fire-messaging.component';

describe('FireMessagingComponent', () => {
  let component: FireMessagingComponent;
  let fixture: ComponentFixture<FireMessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireMessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
