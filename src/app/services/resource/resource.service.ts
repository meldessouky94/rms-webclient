import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Resource } from 'src/app/models/resource';
import { Subject } from 'rxjs';
import { SearchDto } from 'src/app/models/search-dto';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  // This is the list of resources.
  // We actually might not need this variable saved,
  // as only 1 components needs it.
  currentResourceList: Resource[];
  $currentResourceList = new Subject<Resource[]>();

  apiUrl = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) { }

  ///////////////////////////////////////////////////
  // Methods pertaining to objects that need to be
  // shared among various components
  //////////////////////////////////////////////////
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
    const query = `${this.apiUrl}reservations/available?startTime=${search.startTime}\
&endTime=${search.endTime}\
&purpose=${search.purpose}\
${search.campusId ? `&campusId=${search.campusId}` : ''}\
${search.buildingId ? `&buildingId=${search.buildingId}` : ''}`;
console.log(query);
    // Return the get method so the component can manage the results as needed
    return this.httpClient.get<Resource[]>(query, { withCredentials: true });
  }

  // Returns an array of campuse objects. Each campus object contains a list of building objects.
  getCampuses() {
    let url = this.apiUrl;
    url += 'resources/campuses';
    return this.httpClient.get<any[]>(url, { withCredentials: true });
  }
}
