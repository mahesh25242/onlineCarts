import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDeliveryPageComponent } from './shop-delivery-page.component';

describe('ShopDeliveryPageComponent', () => {
  let component: ShopDeliveryPageComponent;
  let fixture: ComponentFixture<ShopDeliveryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDeliveryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDeliveryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
