import { CancelReservationPopupComponent } from './cancel-reservation-popup.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { User } from 'src/app/models/user';
import { Reservation } from 'src/app/models/reservation';
import { Subject } from 'rxjs';


/**
 * CancelReservationComponent unit testing
 * @author Jose Meono
 */
describe('CancelReservationPopupComponent', () => {
    let component: CancelReservationPopupComponent;

    // Declare stubs to mock dependencies
    let userServiceStub: { currentUser: User };
    let ngbModalStub: {dismiss: jasmine.Spy};
    let reservationServiceStub: {
        cancelReservations: jasmine.Spy,
        getUserReservations: jasmine.Spy,
        pushNewUserReservations: jasmine.Spy
    };

    // Initialize stubs to default of undefined to reset the function Spys for each test
    beforeEach(() => {
        userServiceStub = { currentUser: undefined };
        ngbModalStub = { dismiss: undefined };
        reservationServiceStub = {
            cancelReservations: undefined,
            getUserReservations: undefined,
            pushNewUserReservations: undefined
        }
    });

    // BEGIN TESTS
    it('should create', () => {
        component = new CancelReservationPopupComponent(<any>ngbModalStub, <any>reservationServiceStub, <any>userServiceStub);
        expect(component).toBeTruthy();
    });

    it('should intialize variables during ngOnInit', () => {
        userServiceStub.currentUser = new User();
        component = new CancelReservationPopupComponent(<any>ngbModalStub, <any>reservationServiceStub, <any>userServiceStub);
        component.ngOnInit();
        expect(component.resolved).toBeFalsy();
        expect(component.error).toBeFalsy();
        expect(component.user).toBe(userServiceStub.currentUser);
    });

    it('should unsubscribe from subscriptions used if component is destroyed', () => {
        const dummyCancelSub = new Subject();
        const dummyUserSub = new Subject();
        component = new CancelReservationPopupComponent(<any>ngbModalStub, <any>reservationServiceStub, <any>userServiceStub);
        component.cancelResSub = dummyCancelSub.subscribe();
        component.getUserResSub = dummyUserSub.subscribe();

        component.ngOnDestroy();
        expect(component.cancelResSub.closed).toBeTruthy();
        expect(component.getUserResSub.closed).toBeTruthy();
    });

    describe('cancelReservation', () => {
        it('should cancel the reservation and update', () => {
            const dummyCancelSub = new Subject();
            const dummyUserSub = new Subject();
            const dummyListReservation = [new Reservation(), new Reservation()];
            reservationServiceStub.cancelReservations = spyOn(ReservationService.prototype, 'cancelReservations');
            reservationServiceStub.getUserReservations = spyOn(ReservationService.prototype, 'getUserReservations');
            reservationServiceStub.pushNewUserReservations = spyOn(ReservationService.prototype, 'pushNewUserReservations');
            ngbModalStub.dismiss = spyOn(NgbActiveModal.prototype, 'dismiss');
            
            reservationServiceStub.cancelReservations.and.returnValue(dummyCancelSub);
            reservationServiceStub.getUserReservations.and.returnValue(dummyUserSub);
            component = new CancelReservationPopupComponent(<any>ngbModalStub, <any>reservationServiceStub, <any>userServiceStub);
            
            component.reservation = new Reservation();
            component.cancelReservation();
            dummyCancelSub.next();
            dummyUserSub.next(dummyListReservation);

            expect(reservationServiceStub.pushNewUserReservations).toHaveBeenCalledWith(dummyListReservation);
            expect(ngbModalStub.dismiss).toHaveBeenCalled()
        });

        it('should set the error variable to true if an error occurs', () => {
            const dummyCancelSub = new Subject();
            reservationServiceStub.cancelReservations = spyOn(ReservationService.prototype, 'cancelReservations');
            ngbModalStub.dismiss = spyOn(NgbActiveModal.prototype, 'dismiss');
            reservationServiceStub.cancelReservations.and.returnValue(dummyCancelSub);
            
            component = new CancelReservationPopupComponent(<any>ngbModalStub, <any>reservationServiceStub, <any>userServiceStub);
            component.reservation = new Reservation();

            component.cancelReservation();
            dummyCancelSub.error(new Error());

            expect(component.error).toBeTruthy();
            expect(ngbModalStub.dismiss).toHaveBeenCalled();
        });
    });
});
