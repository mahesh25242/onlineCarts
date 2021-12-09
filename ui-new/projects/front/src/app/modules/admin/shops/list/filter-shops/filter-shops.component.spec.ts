import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterShopsComponent } from './filter-shops.component';

describe('FilterShopsComponent', () => {
  let component: FilterShopsComponent;
  let fixture: ComponentFixture<FilterShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
