import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannerSvgComponent } from './home-banner-svg.component';

describe('HomeBannerSvgComponent', () => {
  let component: HomeBannerSvgComponent;
  let fixture: ComponentFixture<HomeBannerSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBannerSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBannerSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
