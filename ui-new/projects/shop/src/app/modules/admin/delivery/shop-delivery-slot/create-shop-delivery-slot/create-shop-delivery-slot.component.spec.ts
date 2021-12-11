import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShopDeliverySlotComponent } from './create-shop-delivery-slot.component';

describe('CreateShopDeliverySlotComponent', () => {
  let component: CreateShopDeliverySlotComponent;
  let fixture: ComponentFixture<CreateShopDeliverySlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShopDeliverySlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShopDeliverySlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
