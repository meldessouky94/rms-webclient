import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from 'src/app/models/reservation';
import { CancelReservationPopupComponent } from '../cancel-reservation-popup/cancel-reservation-popup.component';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit, OnDestroy {
  userReservations = [];
  userResSub: Subscription;

  loaded: boolean;
  error; boolean;
  time = { hour: 9, minute: 30 };
  meridian = true;

  constructor(
    config: NgbAccordionConfig,
    private modalService: NgbModal,
    private reservationService: ReservationService) {
    // customize default values of accordions used by this component tree
    config.closeOthers = true;
    config.type = 'primary';
    this.loaded = true;
    this.error = false;

    this.userResSub = this.reservationService.$userReservations.subscribe( (data) => {
      this.userReservations = data;
    });
    if (this.reservationService.userReservations) {
      this.userReservations = this.reservationService.userReservations;
    } else {
      this.reservationService.getUserReservations().subscribe( (data) => {
        this.reservationService.pushNewUserReservations(data);
      });
    }
    ////// Testing only:
    // this.userReservations = [
    //   {
    //     id: 2,
    //     purpose: 'INTERVIEW',
    //     startTime: '2018-03-04T12:25:23.00',
    //     endTime: '2018-03-04T13:25:23.00',
    //     resource: {
    //       'id': 2,
    //       'type': 'cubicle',
    //       'buildingId': 1,
    //       'enabled': true,
    //       'retired': false,
    //       'availableStartDate': '',
    //       'reservableAfter': '',
    //       'reservableBefore': '',
    //       'availableDays': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    //       'name': 'Cubicle 2',
    //       'hasEthernet': false,
    //       'hasComputer': true,
    //       'numberOfOutlets': 3,
    //       'hasMicrophone': true
    //     },
    //     userId: 1245,
    //     cancelled: false,
    //     approved: true
    //   }, {
    //     id: 3,
    //     purpose: 'PANEL',
    //     startTime: '2018-03-07T12:25:23.00',
    //     endTime: '2018-03-07T13:25:23.00',
    //     resource: {
    //       'id': 1,
    //       'type': 'cubicle',
    //       'buildingId': 1,
    //       'enabled': true,
    //       'retired': false,
    //       'availableStartDate': '',
    //       'reservableAfter': '',
    //       'reservableBefore': '',
    //       'availableDays': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    //       'name': 'Cubicle 1',
    //       'hasEthernet': true,
    //       'hasComputer': true,
    //       'numberOfOutlets': 2,
    //       'hasMicrophone': true
    //     },
    //     userId: 1245,
    //     cancelled: false,
    //     approved: true
    //   }];
  }

  open(selectedReservation: Reservation) {
    const modalRef = this.modalService.open(CancelReservationPopupComponent, { centered: true });
    modalRef.componentInstance.reservation = selectedReservation;
    modalRef.componentInstance.loaded = true;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.userResSub) {
      this.userResSub.unsubscribe();
    }
  }


  toggleMeridian() {
    this.meridian = !this.meridian;
  }

}
