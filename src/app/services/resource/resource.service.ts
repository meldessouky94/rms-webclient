import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  apiUrl = `${environment.apiUrl}resources`;

  constructor(private httpClient: HttpClient) { }

  // Returns an array of campuse objects. Each campus object contains a list of building objects.
  getCampuses() {
    let url = this.apiUrl;
    url += '/campuses';
    return this.httpClient.get(url, {withCredentials: true});
  }
}
