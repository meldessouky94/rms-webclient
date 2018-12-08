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

  formInput: SearchDto;

  currentReservation: Reservation;
  $currentReservation = new Subject<Reservation>();

  currentResourceList: Resource[];
  $currentResourceList = new Subject<Resource[]>();

  apiUrl = `${environment.apiUrl}reservations`;

  constructor(private httpClient: HttpClient, userService: UserService) { }

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
