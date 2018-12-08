import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from 'src/app/models/reservation';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchDto } from 'src/app/models/search-dto';
import { Resource } from 'src/app/models/resource';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  currentReservation: Reservation;
  $currentReservation = new Subject<Reservation>();

  currentResourceList: Resource[];
  $currentResourceList = new Subject<Resource[]>();

  apiUrl = `${environment.apiUrl}reservations`;

  constructor(private httpClient: HttpClient) { }

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
    const query = `${this.apiUrl}?startTime=${search.startTime}\
&endTime=${search.endTime}\
&purpose=${search.purpose}\
${search.campusId ? `&campusId=${search.campusId}` : ''}\
${search.buildingId ? `&buildingId=${search.buildingId}` : ''}`;

    // Return the get method so the component can manage the results as needed
    return this.httpClient.get(query, {withCredentials: true});
  }

  createNewReservation(reservation: Reservation) {
    return this.httpClient.post(this.apiUrl, JSON.stringify(reservation));
  }




}
