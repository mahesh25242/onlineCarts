import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndCondtionBlockComponent } from './terms-and-condtion-block.component';

describe('TermsAndCondtionBlockComponent', () => {
  let component: TermsAndCondtionBlockComponent;
  let fixture: ComponentFixture<TermsAndCondtionBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsAndCondtionBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndCondtionBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
