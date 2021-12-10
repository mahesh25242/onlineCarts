import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationComponent } from './delivery-loaction.component';

describe('DeliveryLocationComponent', () => {
  let component: DeliveryLocationComponent;
  let fixture: ComponentFixture<DeliveryLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
