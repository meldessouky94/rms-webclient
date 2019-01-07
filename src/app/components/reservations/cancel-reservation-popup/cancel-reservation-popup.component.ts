import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-cancel-reservation-popup',
  templateUrl: './cancel-reservation-popup.component.html',
  styleUrls: ['./cancel-reservation-popup.component.css'],
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
    this.user = this.userService.currentUser;
  }

  ngOnInit() {
    this.resolved = false;
    this.error = false;
  }

  cancelReservation() {
    // Cancels reservation, and then updates the list on the page behind the popup.
    this.reservationService.cancelReservations(this.reservation.id).subscribe(() => {
      this.reservationService.getUserReservations().subscribe((data) => {
        this.reservationService.pushNewUserReservations(data);
        this.activeModal.dismiss();
      });
      this.resolved = true;
    }, () => {
      this.resolved = true;
      this.error = true;
      this.activeModal.dismiss();
    });
  }

}
