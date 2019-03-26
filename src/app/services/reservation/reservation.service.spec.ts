import { ReservationService } from './reservation.service';
import { UserService } from '../user/user.service';
import { User } from 'src/app/models/user';
import { Reservation } from 'src/app/models/reservation';
import { Observable, Subscription } from 'rxjs';

describe('ReservationService', () => {
  let httpClientSpy: {get: jasmine.Spy, post: jasmine.Spy};
  let routerSpy: {navigate: jasmine.Spy};
  let reservationService: ReservationService;
  let userService: UserService;
  let testSub: Subscription;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    // Not using the Router so its undefined.
    userService = new UserService(<any> httpClientSpy, <any> routerSpy)
    reservationService = new ReservationService(<any> httpClientSpy, <any> userService);
  });

  it('should be created', () => {
    expect(reservationService).toBeTruthy();
  });

  describe('pushNewCurrentReservation', () => {
    it('should push a reservation on currentReservation', (done: DoneFn) => {
      const dummyReservation: Reservation = new Reservation();
      testSub = reservationService.$currentReservation.subscribe(reservation => {
        expect(reservation).toBe(dummyReservation);
        done();
      });
      reservationService.pushNewCurrentReservation(dummyReservation);
      expect(reservationService.currentReservation).toBe(dummyReservation);
    });

    it('should push an undefined reservation to currentReservation', (done: DoneFn) => {
      testSub = reservationService.$currentReservation.subscribe((u) => {
        expect(u).toBeFalsy();
        done();
      });
      reservationService.pushNewCurrentReservation(undefined);
      expect(reservationService.currentReservation).toBeFalsy();
    });
  });

  describe('pushNewUserReservation', () => {
    it('should reservation to userReservation', (done: DoneFn) => {
      const dummyReservation: Reservation[] = [new Reservation()];
      testSub = reservationService.$userReservations.subscribe(reservationList => {
        expect(reservationList).toBe(dummyReservation);
        done();
      });
      reservationService.pushNewUserReservations(dummyReservation);
      expect(reservationService.userReservations).toBe(dummyReservation);
    });

    it('should push an undefined reservation to userReservation', (done:DoneFn) => {
      testSub = reservationService.$userReservations.subscribe((dummyReservation) => {
        expect(dummyReservation).toBeFalsy();
        done();
      });
      reservationService.pushNewUserReservations(undefined);
      expect(reservationService.userReservations).toBeFalsy();
    });
  });

  describe('createNewReservation', () => {
    it('should send a post request with a reservation object', () => {
      const dummyReservation: Reservation = new Reservation();
      const dummyUser: User = new User();
      userService.currentUser = dummyUser;
      httpClientSpy.post.and.returnValue(new Observable<Reservation>());
      testSub = reservationService.createNewReservation(dummyReservation).subscribe();
      expect(httpClientSpy.post.calls.count()).toBe(1);
    });
  });

  describe('getUserReservations', () => {
    it('should send a get request and get a list of reservation', () => {
      httpClientSpy.get.and.returnValue(new Observable<Reservation[]>());
      testSub = reservationService.getUserReservations().subscribe();
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  });

  describe('getAllReservations', () => {
    it('should send a get request and get all reservations', () => {
      httpClientSpy.get.and.returnValue(new Observable<Reservation[]>());
      testSub = reservationService.getAllReservations().subscribe();
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  });

  describe('getReservationById', () => {
    it('should send a get request and pass an Id', () => {
      const targetId = 1;
      httpClientSpy.get.and.returnValue(new Observable<Reservation>());
      testSub = reservationService.getReservationById(targetId).subscribe();
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  });

  describe('cancelReservation', () => {
    it('should make a post call to cancel a reservation by id', () => {
      const targetId = 1;
      httpClientSpy.post.and.returnValue(new Observable());
      testSub = reservationService.cancelReservations(targetId).subscribe();
      expect(httpClientSpy.post.calls.count()).toBe(1);
    });
  });

  afterEach(() => {
    if (testSub) testSub.unsubscribe();
  });
});
