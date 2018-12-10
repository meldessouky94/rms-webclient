import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser;

  constructor(private httpClient: HttpClient) { }

  getToken(code) {
    const apiUrl = `${environment.apiUrl}reservations/authenticate`;
    this.httpClient.post(apiUrl, code).subscribe( (payload) => {
      this.currentUser = payload;
    });

  }
}
