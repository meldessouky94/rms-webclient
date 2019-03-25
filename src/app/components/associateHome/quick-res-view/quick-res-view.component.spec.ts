import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { QuickResViewComponent } from './quick-res-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import {Subject} from "rxjs";
import {Reservation} from "../../../models/reservation";

/**
 * Quick Reservation View component tests
 * @author: Mohamed Eldessouky, Thiago Mendonca
 */
describe('QuickResViewComponent', () =>{

  let component: QuickResViewComponent;

  let mockResService: {
    getUserReservations: jasmine.Spy,
    pushNewUserReservations: jasmine.Spy
  } = {
    getUserReservations: undefined,
    pushNewUserReservations: undefined
  };


  it('should check that getReservations match our expected return value, ', ()=>{
    component = new QuickResViewComponent(<any>mockResService);
    let fakeSubject: Subject<Reservation[]> = new Subject();
    let fakeReservationList: Reservation[] = [new Reservation(), new Reservation()];
    mockResService.getUserReservations = spyOn(ReservationService.prototype, 'getUserReservations');
    mockResService.pushNewUserReservations = spyOn(ReservationService.prototype, 'pushNewUserReservations');
    mockResService.getUserReservations.and.returnValue(fakeSubject);

    component.getReservations();

    expect(component.loaded).toBeFalsy();

    fakeSubject.next(fakeReservationList);

    expect(component.userReservations).toEqual(fakeReservationList);
    expect(mockResService.pushNewUserReservations).toHaveBeenCalledWith(fakeReservationList);
    expect(component.loaded).toBeTruthy();
    expect(component.error).toBeFalsy();
  });

  it('should handle error', () =>{
    component = new QuickResViewComponent(<any>mockResService);
    let fakeSubject: Subject<Reservation[]> = new Subject();
    mockResService.getUserReservations = spyOn(ReservationService.prototype, 'getUserReservations');
    mockResService.pushNewUserReservations = spyOn(ReservationService.prototype, 'pushNewUserReservations');
    mockResService.getUserReservations.and.returnValue(fakeSubject);


    component.getReservations();
    fakeSubject.error(new Error());
    expect(component.error).toBeTruthy();
    expect(component.loaded).toBeTruthy();
  })

});

// describe('QuickResViewComponent', () => {
//   let component: QuickResViewComponent;
//   let fixture: ComponentFixture<QuickResViewComponent>;
//   let testBedService: ReservationService;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [QuickResViewComponent],
//       providers: [ReservationService],
//       imports: [HttpClientModule],
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(async () => {
//     fixture = TestBed.createComponent(QuickResViewComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     testBedService = TestBed.get(ReservationService);
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('Service injected and testBed Service are same instance',
//     inject([ReservationService], (injectedService: ReservationService) => {
//       expect(injectedService).toBe(testBedService);
//     }),
//   );
// });
