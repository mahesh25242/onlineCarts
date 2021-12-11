import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTagChipComponent } from './product-tag-chip.component';

describe('ProductTagChipComponent', () => {
  let component: ProductTagChipComponent;
  let fixture: ComponentFixture<ProductTagChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTagChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTagChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
