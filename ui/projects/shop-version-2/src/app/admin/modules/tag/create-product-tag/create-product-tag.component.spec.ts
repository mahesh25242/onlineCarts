import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductTagComponent } from './create-product-tag.component';

describe('CreateProductTagComponent', () => {
  let component: CreateProductTagComponent;
  let fixture: ComponentFixture<CreateProductTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
