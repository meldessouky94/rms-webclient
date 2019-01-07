import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { CancelReservationPopupComponent } from './cancel-reservation-popup.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { UserService } from 'src/app/services/user/user.service';

describe('CancelReservationPopupComponent', async () => {
  let component: CancelReservationPopupComponent;
  let fixture: ComponentFixture<CancelReservationPopupComponent>;
  let userTestBedService: UserService;
  let reservationTestBedService: ReservationService;

  await beforeEach((async () => {
    await (await TestBed.configureTestingModule({
      providers: [ NgbModal,
        NgbActiveModal,
        ReservationService,
        UserService ],
      imports: [ HttpClientModule ],
      declarations: [ CancelReservationPopupComponent ],
    }))
    .compileComponents();
  }));

  beforeEach( async () => {
    fixture = await TestBed.createComponent(CancelReservationPopupComponent);
    component = await fixture.componentInstance;
    await fixture.detectChanges();
    userTestBedService = await TestBed.get(UserService);
    reservationTestBedService = await TestBed.get(ReservationService);
  });

  fit('should create', async () => {
    expect(component).toBeTruthy();
  });

  fit('User Service injected and testBed Service are same instance',
    inject([UserService], async (injectedService: UserService) => {
      await expect(injectedService).toBe(userTestBedService);
    }),
  );

  fit('Reservation Service injected and testBed Service are same instance',
    inject([ReservationService], async (injectedService: ReservationService) => {
      await expect(injectedService).toBe(reservationTestBedService);
    }),
  );
});
