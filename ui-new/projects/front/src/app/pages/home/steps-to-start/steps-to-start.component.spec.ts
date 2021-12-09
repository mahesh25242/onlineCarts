import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsToStartComponent } from './steps-to-start.component';

describe('StepsToStartComponent', () => {
  let component: StepsToStartComponent;
  let fixture: ComponentFixture<StepsToStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsToStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsToStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
