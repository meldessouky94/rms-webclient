import { Component, OnInit } from '@angular/core';
import { ReservationIdBehaviorSetService } from '../../../../services/shared/reservation-id-behavior-set.service';
import { Router } from '@angular/router';
import { Reservation } from '../../../../models/reservation';
import { Resource } from '../../../../models/resource';
import { User } from '../../../../models/user';
import { ReservationService } from '../../../../services/reservation/reservation.service';
import { ResourceService } from '../../../../services/resource/resource.service';
import { UserService } from 'src/app/services/user/user.service';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

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
  public updated: boolean;
  resources: Resource[];
  time1 = '';
  time2 = '';
  date = '';
  constructor(private reservationIdBehaviorSetService: ReservationIdBehaviorSetService,
              private reservationService: ReservationService,
              private resourceService: ResourceService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {

    this.checkIfAdmin();

    this.reservationIdBehaviorSetService.currentMessage.subscribe((message) => this.setReservationId(message));
    this.getAllResources();
  }

  getAllResources() {
    this.resourceService.getAllResources().subscribe(
      (resources) => this.resources = resources);
  }

  /**
   * Checks if the current user is an admin and redirects back to login if they are not.
   */
  checkIfAdmin() {
    if (!sessionStorage.getItem('admin')) {
      this.router.navigate(['adminLogin']);
    }
  }

  setReservationId(reservationId: number) {
    console.log('ReservationId: ' + reservationId);
    this.findReservationById(reservationId);
  }

  findReservationById(reservationId: number) {
   this.reservationService.getReservationById(reservationId).subscribe(
    (reservation) => {this.reservation = reservation;
                      this.findUserById(reservation.userId);
                      this.findResourceById(reservation.resourceId);
                     });
  }

  findResourceById(resourceId: number) {
    this.resourceService.getResourceById(resourceId).subscribe(
     (resource) => this.resource = resource[0]);
  }

  findUserById(userId: string) {
    this.userService.getUserById(userId).subscribe(
     (user) => this.user = user);
  }
/**
 * update reservation that was edited.
 */
  updateReservatiion() {
    /** set the new reservation time to date plus hour */
    this.reservation.startTime = this.date + 'T' + this.time1 + ':00';
    this.reservation.endTime = this.date + 'T' + this.time2 + ':00';
    this.reservation.resourceId = this.resource.id;
    console.log('NEW ID --> ResourceID: ' + this.resource.id);

    /** send the reservation object to the server so it can update that entry from the database */
    this.reservationService.updateReservation(this.reservation).subscribe(
     (reserv) => this.reservation = reserv);
  }
  /**
   * If admins decides he/she does
   * not want to edit the reservation
   * it routes back to the calendar.
   */
  cancelReservation() {
    /** navigate to the calendar page */
    this.router.navigate(['/calendar']);
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
