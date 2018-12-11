import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelReservationPopupComponent } from './cancel-reservation-popup.component';

describe('CancelReservationPopupComponent', () => {
  let component: CancelReservationPopupComponent;
  let fixture: ComponentFixture<CancelReservationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelReservationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelReservationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
