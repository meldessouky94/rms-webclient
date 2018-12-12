import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from 'src/app/models/reservation';
import { CancelReservationPopupComponent } from '../cancel-reservation-popup/cancel-reservation-popup.component';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  userReservations = [];

  loaded: boolean;
  error; boolean;
  // reservations = [
  //   {
  //     purpose: 'panel',
  //     campus: 'USF',
  //     building: 'NEC',
  //     name: 'Greg',
  //     startTime: '2018 Dec 03 12:30:00',
  //     endTime: '2018 Dec 03 13:30:00'
  //   },
  //   {
  //     purpose: 'interview',
  //     campus: 'USF',
  //     building: 'Bunker',
  //     name: 'Yuki',
  //     startTime: '2018 Dec 05 09:30:00',
  //     endTime: '2018 Dec 05 10:30:00'
  //   },
  //   {
  //     purpose: 'panel',
  //     campus: 'USF',
  //     building: 'NEC',
  //     name: 'Jonathan',
  //     startTime: '2018 Dec 04 13:30:00',
  //     endTime: '2018 Dec 04 14:30:00'
  //   },
  // ];
  // id: number;
  // purpose: string;
  // startTime: string;
  // endTime: string;
  // resource: Resource;
  // userId: number;
  // cancelled: boolean;
  // approved: boolean;
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
    this.userReservations = [
      {
        id: 2,
        purpose: 'INTERVIEW',
        startTime: '2018-03-04T12:25:23.00',
        endTime: '2018-03-04T13:25:23.00',
        resource: {
          'id': 2,
          'type': 'cubicle',
          'buildingId': 1,
          'enabled': true,
          'retired': false,
          'availableStartDate': '',
          'reservableAfter': '',
          'reservableBefore': '',
          'availableDays': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          'name': 'Cubicle 2',
          'hasEthernet': false,
          'hasComputer': true,
          'numberOfOutlets': 3,
          'hasMicrophone': true
        },
        userId: 1245,
        cancelled: false,
        approved: true
      }, {
        id: 3,
        purpose: 'PANEL',
        startTime: '2018-03-07T12:25:23.00',
        endTime: '2018-03-07T13:25:23.00',
        resource: {
          'id': 1,
          'type': 'cubicle',
          'buildingId': 1,
          'enabled': true,
          'retired': false,
          'availableStartDate': '',
          'reservableAfter': '',
          'reservableBefore': '',
          'availableDays': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          'name': 'Cubicle 1',
          'hasEthernet': true,
          'hasComputer': true,
          'numberOfOutlets': 2,
          'hasMicrophone': true
        },
        userId: 1245,
        cancelled: false,
        approved: true
      }];
  }

  open(selectedReservation: Reservation) {
    const modalRef = this.modalService.open(CancelReservationPopupComponent, { centered: true });
    modalRef.componentInstance.reservation = selectedReservation;
    modalRef.componentInstance.loaded = true;
  }

  ngOnInit() {
  }


  toggleMeridian() {
    this.meridian = !this.meridian;
  }

}
