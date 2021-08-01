import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVarientTagSelectionComponent } from './product-varient-tag-selection.component';

describe('ProductVarientTagSelectionComponent', () => {
  let component: ProductVarientTagSelectionComponent;
  let fixture: ComponentFixture<ProductVarientTagSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVarientTagSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVarientTagSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
