import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointCouponsComponent } from './point-coupons.component';

describe('PointCouponsComponent', () => {
  let component: PointCouponsComponent;
  let fixture: ComponentFixture<PointCouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointCouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
