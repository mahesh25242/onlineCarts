import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTagSelectionComponent } from './product-tag-selection.component';

describe('ProductTagSelectionComponent', () => {
  let component: ProductTagSelectionComponent;
  let fixture: ComponentFixture<ProductTagSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTagSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTagSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
