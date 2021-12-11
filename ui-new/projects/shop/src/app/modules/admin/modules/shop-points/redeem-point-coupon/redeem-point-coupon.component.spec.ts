import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemPointCouponComponent } from './redeem-point-coupon.component';

describe('RedeemPointCouponComponent', () => {
  let component: RedeemPointCouponComponent;
  let fixture: ComponentFixture<RedeemPointCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemPointCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemPointCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
