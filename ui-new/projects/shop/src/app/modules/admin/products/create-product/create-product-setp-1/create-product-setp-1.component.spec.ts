import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductStep1Component } from './create-product-setp-1.component';

describe('CreateProductStep1Component', () => {
  let component: CreateProductStep1Component;
  let fixture: ComponentFixture<CreateProductStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
