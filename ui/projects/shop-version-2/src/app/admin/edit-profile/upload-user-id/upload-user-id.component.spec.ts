import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadUserIdComponent } from './upload-user-id.component';

describe('UploadUserIdComponent', () => {
  let component: UploadUserIdComponent;
  let fixture: ComponentFixture<UploadUserIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadUserIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadUserIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
