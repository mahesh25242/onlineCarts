import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSearchPopComponent } from './mobile-search-pop.component';

describe('MobileSearchPopComponent', () => {
  let component: MobileSearchPopComponent;
  let fixture: ComponentFixture<MobileSearchPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSearchPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSearchPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
