import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesSvgComponent } from './features-svg.component';

describe('FeaturesSvgComponent', () => {
  let component: FeaturesSvgComponent;
  let fixture: ComponentFixture<FeaturesSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturesSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
