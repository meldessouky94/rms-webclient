import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from 'src/app/models/reservation';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchDto } from 'src/app/models/search-dto';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservationSearch: Reservation;
  $reservationSearch = new Subject<Reservation>();

  apiUrl = `${environment.apiUrl}reservations`;

  constructor(private httpClient: HttpClient) { }

  getAvailableResources(search: SearchDto) {
    // Create the query to find availabel resources
    const query = `${this.apiUrl}?startTime=${search.startTime}\
&endTime=${search.endTime}\
&purpose=${search.purpose}\
${search.campusId ? `&campusId=${search.campusId}` : ''}\
${search.buildingId ? `&buildingId=${search.buildingId}` : ''}`;
    return this.httpClient.get(query, {withCredentials: true});
  }

  queryNewReservation(reservation: Reservation) {
    // const url = `http...`
    // return this.httpclient.post(url, this.reservation)
  }
}
