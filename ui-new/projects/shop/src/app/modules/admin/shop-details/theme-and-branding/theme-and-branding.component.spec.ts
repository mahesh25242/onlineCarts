import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeAndBrandingComponent } from './theme-and-branding.component';

describe('ThemeAndBrandingComponent', () => {
  let component: ThemeAndBrandingComponent;
  let fixture: ComponentFixture<ThemeAndBrandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeAndBrandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeAndBrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
