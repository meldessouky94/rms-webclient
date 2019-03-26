import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { CancelReservationPopupComponent } from './cancel-reservation-popup.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
import { Reservation } from 'src/app/models/reservation';
import { Subject, Observable } from 'rxjs';
import { Resource } from 'src/app/models/resource';
import { SearchDto } from 'src/app/models/search-dto';

describe('CancelReservationPopupComponent', () => {
    let component: CancelReservationPopupComponent;

    let userServiceStub: { currentUser: User } = {
        currentUser: undefined,
    };
    let ngbModalStub: {}
    let reservationServiceStub: {
        currentReservation: Reservation, $currenReservation: Subject<Reservation>,
        userReservations: Reservation[], $userReservations: Subject<Reservation[]>
    } = {
        currentReservation: new Reservation(),
        $currenReservation: new Subject(),
        userReservations: [new Reservation(), new Reservation()],
        $userReservations: new Subject(),
    };
    it('should create', () => {
        component = new CancelReservationPopupComponent(<any>ngbModalStub, <any>reservationServiceStub, <any>userServiceStub);
        expect(component).toBeTruthy();
    });
    it('should initialize user when component is init', () => {
        userServiceStub.currentUser = new User();
        component = new CancelReservationPopupComponent(<any>ngbModalStub, <any>reservationServiceStub, <any>userServiceStub);
        expect(component.user).toBe(userServiceStub.currentUser);
    });
    it('should intialize variables during ngOnInit', () => {
        component = new CancelReservationPopupComponent(<any>ngbModalStub, <any>reservationServiceStub, <any>userServiceStub);
        component.ngOnInit();
        expect(component.resolved).toBeFalsy();
        expect(component.error).toBeFalsy();
    });
    // describe('cancelReservation', () => {
    //     fit('should cancel the reservation and update', () => {
    //         const functionStub: {
    //             cancelReservations: jasmine.Spy,
    //             getUserReservations: jasmine.Spy,
    //             pushNewUserReservations: jasmine.Spy,
    //         } = jasmine.createSpyObj('ReservationService', ['cancelReservations', 'getUserReservation', 'pushNewUserReservations']);
    //         const dummyCancelSub = new Subject();
    //         const dummyUserSub = new Subject();
    //         const dummyListReservation = [new Reservation(), new Reservation()];
    //         component = new CancelReservationPopupComponent(<any>ngbModalStub, <any>functionStub, <any>userServiceStub);
    //         console.log(functionStub.cancelReservations);
    //         functionStub.cancelReservations.and.returnValue(dummyCancelSub);
    //         functionStub.getUserReservations.and.returnValue(dummyUserSub);
    //         component.reservation = new Reservation();
    //         component.cancelReservation();
    //         expect(functionStub.cancelReservations).toHaveBeenCalled();
    //     });
    // });
});
