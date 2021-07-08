import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDeliverySlotComponent } from './shop-delivery-slot.component';

describe('ShopDeliverySlotComponent', () => {
  let component: ShopDeliverySlotComponent;
  let fixture: ComponentFixture<ShopDeliverySlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDeliverySlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDeliverySlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
