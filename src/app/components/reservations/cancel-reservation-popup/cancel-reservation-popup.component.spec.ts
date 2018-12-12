import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CancelReservationPopupComponent } from './cancel-reservation-popup.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { UserService } from 'src/app/services/user/user.service';

describe('CancelReservationPopupComponent', () => {
  let component: CancelReservationPopupComponent;
  let fixture: ComponentFixture<CancelReservationPopupComponent>;
  let userTestBedService: UserService;
  let reservationTestBedService: ReservationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ NgbModal,
        NgbActiveModal,
        ReservationService,
        UserService ],
      imports: [ HttpClientModule ],
      declarations: [ CancelReservationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelReservationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userTestBedService = TestBed.get(UserService);
    reservationTestBedService = TestBed.get(ReservationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('User Service injected and testBed Service are same instance',
    inject([UserService], (injectedService: UserService) => {
      expect(injectedService).toBe(userTestBedService);
    })
  );

  it('Reservation Service injected and testBed Service are same instance',
    inject([ReservationService], (injectedService: ReservationService) => {
      expect(injectedService).toBe(reservationTestBedService);
    })
  );
});
