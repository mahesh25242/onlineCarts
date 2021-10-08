import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPopUpNotificationsComponent } from './shop-pop-up-notifications.component';

describe('ShopPopUpNotificationsComponent', () => {
  let component: ShopPopUpNotificationsComponent;
  let fixture: ComponentFixture<ShopPopUpNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPopUpNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPopUpNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
