import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoNeedThisComponent } from './who-need-this.component';

describe('WhoNeedThisComponent', () => {
  let component: WhoNeedThisComponent;
  let fixture: ComponentFixture<WhoNeedThisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoNeedThisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoNeedThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
