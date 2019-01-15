import { Component, OnInit } from '@angular/core';
import { ReservationIdBehaviorSetService } from '../../../../services/shared/reservation-id-behavior-set.service';
import { Reservation } from '../../../../models/reservation';
import { Resource } from '../../../../models/resource';
import { User } from '../../../../models/user';
import { ReservationService } from '../../../../services/reservation/reservation.service';
import { ResourceService } from '../../../../services/resource/resource.service';
import { UserService } from 'src/app/services/user/user.service';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin-edit-reservation',
  templateUrl: './admin-edit-reservation.component.html',
  styleUrls: ['./admin-edit-reservation.component.css'],
})
export class AdminEditReservationComponent implements OnInit {
  public reservation = new Reservation();
  public resource = new Resource();
  public user = new User();
  public edit: boolean;

  constructor(private reservationIdBehaviorSetService: ReservationIdBehaviorSetService,
              private reservationService: ReservationService,
              private resourceService: ResourceService,
              private userService: UserService) { }

  ngOnInit() {
    this.reservationIdBehaviorSetService.currentMessage.subscribe((message) => this.setReservationId(message));
  }

  setReservationId(reservationId: number) {
    console.log('ReservationId: ' + reservationId);
    this.findReservationById(reservationId);
  }

  findReservationById(reservationId: number) {
   this.reservationService.getReservationById(reservationId).subscribe(
    (reservation) => {this.reservation = reservation;
                      console.log('ResourceId: ' + reservation.resourceId);
                      console.log('UserId: ' + reservation.userId);
                      this.findUserById(reservation.userId);
                      this.findResourceById(reservation.resourceId);
                     });
  }
  findResourceById(resourceId: number) {
    console.log('Insdie findResourceById ->  Name: ' + resourceId);
    this.resourceService.getResourceById(resourceId).subscribe(
     (resource) => this.resource = resource[0]);
  }
  findUserById(userId: string) {
    console.log('Inside findUserById -> UserId: ' + userId);
    this.userService.getUserById(userId).subscribe(
     (user) => this.user = user);
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
   * Resets the information on the form.
   */
  reset() {
    // TODO: use two-way data binding to clear form
    // on button click from user
  }

}
