import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileContactComponent } from './mobile-contact.component';

describe('MobileContactComponent', () => {
  let component: MobileContactComponent;
  let fixture: ComponentFixture<MobileContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
