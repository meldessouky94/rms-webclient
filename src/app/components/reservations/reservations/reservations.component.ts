import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from 'src/app/models/reservation';
import { CancelReservationPopupComponent } from '../cancel-reservation-popup/cancel-reservation-popup.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations = [
    {
      purpose: 'panel',
      campus: 'USF',
      building: 'NEC',
      name: 'Greg',
      startTime: '2018 Dec 03 12:30:00',
      endTime: '2018 Dec 03 13:30:00'
    },
    {
      purpose: 'interview',
      campus: 'USF',
      building: 'Bunker',
      name: 'Yuki',
      startTime: '2018 Dec 05 09:30:00',
      endTime: '2018 Dec 05 10:30:00'
    },
    {
      purpose: 'panel',
      campus: 'USF',
      building: 'NEC',
      name: 'Jonathan',
      startTime: '2018 Dec 04 13:30:00',
      endTime: '2018 Dec 04 14:30:00'
    },
  ];
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

  constructor(config: NgbAccordionConfig, private modalService: NgbModal) {
    // customize default values of accordions used by this component tree
    config.closeOthers = true;
    config.type = 'dark';
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
