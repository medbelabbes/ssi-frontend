import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsListingComponent } from './admins-listing.component';

describe('AdminsListingComponent', () => {
  let component: AdminsListingComponent;
  let fixture: ComponentFixture<AdminsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
