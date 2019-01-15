import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditReservationComponent } from './admin-edit-reservation.component';

describe('AdminEditReservationComponent', () => {
  let component: AdminEditReservationComponent;
  let fixture: ComponentFixture<AdminEditReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
