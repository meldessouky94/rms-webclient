import { Component, OnInit } from '@angular/core';
import { ReservationIdBehaviorSetService } from '../../../../services/shared/reservation-id-behavior-set.service';

@Component({
  selector: 'app-admin-edit-reservation',
  templateUrl: './admin-edit-reservation.component.html',
  styleUrls: ['./admin-edit-reservation.component.css'],
})
export class AdminEditReservationComponent implements OnInit {
  public reservationId: number;

  constructor(private reservationIdBehaviorSetService: ReservationIdBehaviorSetService) { }

  ngOnInit() {
    this.reservationIdBehaviorSetService.currentMessage.subscribe((message) => this.reservationId = message);
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
