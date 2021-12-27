import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazorGatewayComponent } from './razor-gateway.component';

describe('RazorGatewayComponent', () => {
  let component: RazorGatewayComponent;
  let fixture: ComponentFixture<RazorGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazorGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazorGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
