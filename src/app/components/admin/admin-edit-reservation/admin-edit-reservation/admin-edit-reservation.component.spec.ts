import { ResourceService } from './../../../../services/resource/resource.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditReservationComponent } from './admin-edit-reservation.component';
import { Subject } from 'rxjs';
import { Reservation } from 'src/app/models/reservation';
import { Resource } from 'src/app/models/resource';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';



/**
 * Admin Edit Reservation Component Unit Tests
 * @author Tyler Williams
 */

describe('AdminEditReservationComponent', () => {
    let component: AdminEditReservationComponent;
    let fixture: ComponentFixture<AdminEditReservationComponent>;

    // Mocking component dependencies
    let reservationIdBehaviorSetServiceStub: {
        currentMessage: Subject<number>
    }

    let reservationServiceStub: {
        currentReservation: Reservation,
        $currentReservation: Subject<Reservation>,
        userReservations: Reservation[],
        $userReservations: Subject<Reservation[]>,
        getReservationById: jasmine.Spy
    } 

    let resourceServiceStub: {
        currentResourceList: Resource[],
        $currentResourceList: Subject<Resource[]>,
        getResourceById: jasmine.Spy
    }

    let userServiceStub: {
        currentUser: User,
        $currentUser: Subject<User>,
        getUserById: jasmine.Spy
    }

    beforeEach(() => {
        reservationIdBehaviorSetServiceStub = {
            currentMessage: new Subject()
        }

        reservationServiceStub = {
                currentReservation: undefined,
                $currentReservation: new Subject(),
                userReservations: undefined,
                $userReservations: new Subject(),
                getReservationById: spyOn(ReservationService.prototype, 'getReservationById')
        }

        resourceServiceStub = {
                currentResourceList: undefined,
                $currentResourceList: new Subject(),
                getResourceById: spyOn(ResourceService.prototype, 'getResourceById')
        }

        userServiceStub  = {
            currentUser: undefined,
            $currentUser: new Subject(),
            getUserById: spyOn(UserService.prototype, 'getUserById')
        };


    });

    it('should create', () => {
        component = new AdminEditReservationComponent(
            <any>reservationIdBehaviorSetServiceStub,
            <any>reservationServiceStub,
            <any>resourceServiceStub,
            <any>userServiceStub
        );
        expect(component).toBeTruthy();
    });

    it('should set the current message upon component init', () => {
        component = new AdminEditReservationComponent(
            <any>reservationIdBehaviorSetServiceStub,
            <any>reservationServiceStub,
            <any>resourceServiceStub,
            <any>userServiceStub
        );
        component.ngOnInit();
        expect(reservationIdBehaviorSetServiceStub.currentMessage).toBeTruthy();
    });


    describe('findReservationById', () => {
        it('should find the reservation by id', () => {
            component = new AdminEditReservationComponent(
                <any>reservationIdBehaviorSetServiceStub,
                <any>reservationServiceStub,
                <any>resourceServiceStub,
                <any>userServiceStub
            );

            let fakeReservation = new Reservation();
            let fakeSubject = new Subject<Reservation>();
            let findUserSpy = spyOn(AdminEditReservationComponent.prototype, 'findUserById');
            let findResourceSpy = spyOn(AdminEditReservationComponent.prototype, 'findResourceById')

            reservationServiceStub.getReservationById.and.returnValue(fakeSubject);
            component.findReservationById(1);
            fakeSubject.next(fakeReservation);
            expect(findUserSpy).toHaveBeenCalled();
            expect(findResourceSpy).toHaveBeenCalled();
        });
    });

    describe('findResourceById', () => {
        it('should find a resource by id', () => {
            component = new AdminEditReservationComponent(
                <any>reservationIdBehaviorSetServiceStub,
                <any>reservationServiceStub,
                <any>resourceServiceStub,
                <any>userServiceStub
            );

            let fakeResource = new Resource();
            let fakeSubject = new Subject<Resource>();

            resourceServiceStub.getResourceById.and.returnValue(fakeSubject);
            component.findResourceById(1);
            fakeSubject.next(fakeResource);
            expect(component.resource).toBe(fakeResource);
        });
    });

    describe('findUserById', () => {
        it('should find a user by id', () => {
            component = new AdminEditReservationComponent(
                <any>reservationIdBehaviorSetServiceStub,
                <any>reservationServiceStub,
                <any>resourceServiceStub,
                <any>userServiceStub
            );

            let fakeUser = new User();
            let fakeSubject = new Subject<User>();

            userServiceStub.getUserById.and.returnValue(fakeSubject);
            component.findUserById("1");
            fakeSubject.next(fakeUser);
            expect(component.user).toBe(fakeUser);
        });
    });
});
