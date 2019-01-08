import { TestBed } from '@angular/core/testing';

import { ReservationService } from './reservation.service';
import { UserService } from '../user/user.service';
import { User } from 'src/app/models/user';
import { Reservation } from 'src/app/models/reservation';

describe('ReservationService', () => {
  let service: ReservationService;
  let userService: UserService;
  let user: User;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UserService,
    ],
  }));

  beforeEach(() => {
    service = TestBed.get(ReservationService);
    userService = TestBed.get(UserService);
    user = new User();
    user.id = 'test-id';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createNewReservation', () => {
    it('should set reservations ID', () => {
      userService.currentUser = user;
      const reservation = new Reservation();
      service.createNewReservation(reservation);
      expect(reservation.userId).toEqual(userService.currentUser.id);
    });
  });
});
