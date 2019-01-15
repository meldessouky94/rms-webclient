import { Component, OnInit } from '@angular/core';
import { ReservationIdBehaviorSetService } from '../../../../services/shared/reservation-id-behavior-set.service';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-admin-edit-reservation',
  templateUrl: './admin-edit-reservation.component.html',
  styleUrls: ['./admin-edit-reservation.component.css'],
})
export class AdminEditReservationComponent implements OnInit {
  public reservationId: number;

  public edit: boolean;

  public  newReservation: Reservation;
  public purpose: string;
  public sTime: string;
  public eTime: string;

  constructor(private reservationIdBehaviorSetService: ReservationIdBehaviorSetService) { }

  ngOnInit() {
    /** the edit boolean by default will be false so you can see the reservation */
    this.edit = false;
    /** new Reservation object created and fields wiill be added into it */
    this.newReservation = new Reservation();
    this.newReservation.purpose = 'new purpose';
    this.newReservation.startTime = 'MMM d, y @ h:mm a';
    this.newReservation.endTime = 'MMM d, y @ h:mm a';
    /** adding the values of the reservation object into new variables */
    this.purpose = this.newReservation.purpose;
    this.sTime = this.newReservation.startTime;
    this.eTime = this.newReservation.endTime;

    /** Gets the reservation object from the database using the id passed by it */
    this.reservationIdBehaviorSetService.currentMessage.subscribe((message) => this.reservationId = message);
  }
  /**
   * Edit the reservation on the form.
   * Activates the edit fields in the
   * component so you can edit the form.
   */
  editReservation() {
    this.edit = !this.edit;
  }
  /**
   * Submit the edit reservation form.
   */
  submit() {
    // TODO: send changes to database for given reservation
  }

  /**
   * Resets the information on the form.
   */
  reset() {
    // TODO: use two-way data binding to clear form
    // on button click from user
  }

}
