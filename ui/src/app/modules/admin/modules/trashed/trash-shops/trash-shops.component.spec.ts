import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashShopsComponent } from './trash-shops.component';

describe('TrashShopsComponent', () => {
  let component: TrashShopsComponent;
  let fixture: ComponentFixture<TrashShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
