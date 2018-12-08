import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from 'src/app/models/reservation';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchDto } from 'src/app/models/search-dto';
import { Resource } from 'src/app/models/resource';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // A user will be able to navigate to a different page and see the same
  // input on the form for creating a reservation with this
  formInput: SearchDto;

  // This is the current reservation in the process or being created or updated.
  // This is the reservation that needs to be passed around components that are
  // involved with creating a new reservation or editing (cancelling) and existing one
  currentReservation: Reservation;
  $currentReservation = new Subject<Reservation>();

  // This is the list of resources.
  // We actually might not need this variable saved, as only 1 components needs it.
  currentResourceList: Resource[];
  $currentResourceList = new Subject<Resource[]>();

  // This is the list of current reservations that a user has.
  // This is chared by a component on the home page and on the
  // current reservations (/reservations) view
  userReservations: Reservation[];
  $userReservations = new Subject<Reservation[]>();

  apiUrl = `${environment.apiUrl}reservations`;

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  ///////////////////////////////////////////////////
  // Methods pertaining to objects that need to be
  // shared among various components
  //////////////////////////////////////////////////
  pushNewCurrentReservation(reservation: Reservation) {
    this.currentReservation = reservation;
    this.$currentReservation.next(reservation);
  }

  pushNewCurrentResourceList(resourceList: Resource[]) {
    this.currentResourceList = resourceList;
    this.$currentResourceList.next(resourceList);
  }

  pushNewUserReservations(reservationList: Reservation[]) {
    this.userReservations = reservationList;
    this.$userReservations.next(reservationList);
  }

  //////////////////////////////////////////////////
  // Methods Pertianing to HTTP requests to the
  // Reservation service
  //////////////////////////////////////////////////
  getAvailableResources(search: SearchDto) {
    // Create the query to find available resources
    const query = `available/${this.apiUrl}?startTime=${search.startTime}\
&endTime=${search.endTime}\
&purpose=${search.purpose}\
${search.campusId ? `&campusId=${search.campusId}` : ''}\
${search.buildingId ? `&buildingId=${search.buildingId}` : ''}`;

    // Return the get method so the component can manage the results as needed
    return this.httpClient.get<Resource[]>(query, {withCredentials: true});
  }

  createNewReservation(reservation: Reservation) {
    return this.httpClient.post<Reservation>(this.apiUrl, JSON.stringify(reservation));
  }

  getUserReservations() {
    const url = `${this.apiUrl}users/${this.userService.currentUser.id}`;
    return this.httpClient.get<Reservation[]>(url, { withCredentials: true });
  }

  cancelReservations(id: number) {
    const url = `${this.apiUrl}cancel/${id}`;
    return this.httpClient.put(url, null, {withCredentials: true});
  }

}
