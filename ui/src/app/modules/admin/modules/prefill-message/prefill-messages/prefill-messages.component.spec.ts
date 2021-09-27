import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefillMessagesComponent } from './prefill-messages.component';

describe('PrefillMessagesComponent', () => {
  let component: PrefillMessagesComponent;
  let fixture: ComponentFixture<PrefillMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefillMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefillMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
