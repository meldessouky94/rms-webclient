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

}
