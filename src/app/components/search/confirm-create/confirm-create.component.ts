import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-create',
  templateUrl: './confirm-create.component.html',
  styleUrls: ['./confirm-create.component.css']
})
export class ConfirmCreateComponent {

  constructor(private reservationService: ReservationService,
                        private router: Router,
              public activeModal: NgbActiveModal) { }

  @Input() reservation;

// should save reservation information to database, and should route to the reservations homepage//

  confirmReservation() {
    this.reservation.resourceId = this.reservation.resource.id;
    this.reservationService.createNewReservation(this.reservation).subscribe( () => {
      this.reservationService.getUserReservations().subscribe( (data) => {
        this.reservationService.pushNewUserReservations(data);
        this.router.navigateByUrl('/reservations');
        this.activeModal.dismiss();
        // console.log('Order has been confirmed!');
    });
  }, () => {
    alert('There was an error with the server! Please try again.');
    this.activeModal.dismiss();
  });
  }

}
