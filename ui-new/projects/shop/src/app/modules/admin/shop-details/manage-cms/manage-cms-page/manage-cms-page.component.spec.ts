import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCmsPageComponent } from './manage-cms-page.component';

describe('ManageCmsPageComponent', () => {
  let component: ManageCmsPageComponent;
  let fixture: ComponentFixture<ManageCmsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCmsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
