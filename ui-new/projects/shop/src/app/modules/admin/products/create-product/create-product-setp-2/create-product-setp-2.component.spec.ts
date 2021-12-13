import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductStep2Component } from './create-product-setp-2.component';

describe('CreateProductStep2Component', () => {
  let component: CreateProductStep2Component;
  let fixture: ComponentFixture<CreateProductStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
