import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-cancel-reservation-popup',
  templateUrl: './cancel-reservation-popup.component.html',
  styleUrls: ['./cancel-reservation-popup.component.sass']
})
export class CancelReservationPopupComponent implements OnInit {


  @Input() reservation: Reservation;
  @Input() loaded: boolean;
  user;
  // Booleans used to show/hide information in the component
  resolved: boolean;
  error: boolean;

  constructor(public activeModal: NgbActiveModal,
    private reservationService: ReservationService,
    private userService: UserService) {
     this.user  = this.userService.currentUser;
  }


  ngOnInit() {
    this.resolved = false;
    this.error = false;
  }

  cancelReservation() {
    // Cancels reservation, and then updates the list on the page behind the popup.
    this.reservationService.cancelReservations(this.reservation.id).subscribe( () => {
      this.reservationService.getUserReservations().subscribe( (data) => {
        this.reservationService.pushNewUserReservations(data);
      });
      this.resolved = true;
    }, () => {
      this.resolved = true;
      this.error = true;
    });
  }


// Reservation list code:
// 1. Needs modalService in the constructor:
//    private modalService: NgbModal,

// Add the following method to the .ts file:
// open(selectedReservation: Reservation) {
//   const modalRef = this.modalService.open(CancelReservationPopupComponent, { centered: true});
//   modalRef.componentInstance.reservation = selectedReservation;
//   modalRef.componentInstance.loaded = true;
// }

// In the HTML where the cancel button will go:
// <button type="button"
// placement="bottom"
// class="btn btn-outline-primary"
// (click)="this.close(reservation)">
//   Cancel Reservation
// </button>
}
