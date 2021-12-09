import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdProofComponent } from './user-id-proof.component';

describe('UserIdProofComponent', () => {
  let component: UserIdProofComponent;
  let fixture: ComponentFixture<UserIdProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIdProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIdProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
