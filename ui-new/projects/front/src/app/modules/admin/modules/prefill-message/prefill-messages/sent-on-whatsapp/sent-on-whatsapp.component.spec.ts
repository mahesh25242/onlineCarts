import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentOnWhatsappComponent } from './sent-on-whatsapp.component';

describe('SentOnWhatsappComponent', () => {
  let component: SentOnWhatsappComponent;
  let fixture: ComponentFixture<SentOnWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentOnWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentOnWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
