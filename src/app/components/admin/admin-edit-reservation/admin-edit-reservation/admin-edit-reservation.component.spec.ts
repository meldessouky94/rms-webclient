import { ResourceService } from './../../../../services/resource/resource.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditReservationComponent } from './admin-edit-reservation.component';
import { Subject } from 'rxjs';
import { Reservation } from 'src/app/models/reservation';
import { Resource } from 'src/app/models/resource';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';



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
    } = {
        currentMessage: new Subject()
    }
    let reservationServiceStub: {
        currentReservation: Reservation,
        $currentReservation: Subject<Reservation>,
        userReservations: Reservation[],
        $userReservations: Subject<Reservation[]>,
    } = {
        currentReservation: undefined,
        $currentReservation: new Subject(),
        userReservations: undefined,
        $userReservations: new Subject()
    };
    let resourceServiceStub: {
        currentResourceList: Resource[],
        $currentResourceList: Subject<Resource[]>,
        getResourceById: jasmine.Spy
    } = {
        currentResourceList: undefined,
        $currentResourceList: new Subject(),
        getResourceById: undefined
    };
    let userServiceStub: {
        currentUser: User,
        $currentUser: Subject<User>
    } = {
        currentUser: undefined,
        $currentUser: new Subject()
    };


    //   beforeEach(async(() => {
    //     TestBed.configureTestingModule({
    //       declarations: [ AdminEditReservationComponent ]
    //     })
    //     .compileComponents();
    //   }));

    //   beforeEach(() => {
    //     fixture = TestBed.createComponent(AdminEditReservationComponent);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    //   });

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


    // describe('setReservationId', () => {
    //     it('should set the reservation id', () => {

    //     });
    // });

    // describe('findReservationById', () => {
    //     it('should find the reservation by id', () => {

    //     });
    // });

    // describe('findResourceById', () => {
    //     it('should find the resource by id', () => {
    //         component = new AdminEditReservationComponent(
    //             <any>reservationIdBehaviorSetServiceStub,
    //             <any>reservationServiceStub,
    //             <any>resourceServiceStub,
    //             <any>userServiceStub
    //         );
    //         resourceServiceStub.getResourceById = spyOn(ResourceService.prototype, 'getResourceById');
    //         // expect(resourceServiceStub.getResourceById).toHaveBeenCalled();
    //         resourceServiceStub

    //   });
    // });

    // describe('findUserById', () => {
    //     it('should find a user by id', () => {

    //     });
    // });
});
