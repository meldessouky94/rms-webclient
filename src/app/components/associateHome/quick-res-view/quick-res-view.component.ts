import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Subscription } from 'rxjs';

/**
 * quick-res-view component creates a list of reservations
 */
@Component({
  selector: 'app-quick-res-view',
  templateUrl: './quick-res-view.component.html',
  styleUrls: ['./quick-res-view.component.css'],
})
export class QuickResViewComponent implements OnInit, OnDestroy {
  userReservations = [];
  userResSub: Subscription;

  loaded: boolean;
  error; boolean;

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    // Hides results while the HTTP request is waiting for a response
    this.loaded = false;
    this.userResSub = this.reservationService.getUserReservations().subscribe( (list) => {
      // Updates list here and updates list, as /resverations will
      // share the same list.
      this.userReservations = list;
      this.reservationService.pushNewUserReservations(list);
      this.loaded = true;
      this.error = false;
    }, (err) => {
      // Error handling in case of connection issues.
      this.error = true;
      this.loaded = true;
    });
  }

  ngOnDestroy() {
    if (this.userResSub) this.userResSub.unsubscribe();
  }
}
