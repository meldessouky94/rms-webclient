import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  status: number;
  isAuthenticated: boolean;
  // For testing:
  currentUser: any = {id: 'a2'};
  // For release
  // currentUser: any;
  
  constructor(private httpClient: HttpClient, public router: Router) { }

  getToken(code) {
    const apiUrl = `${environment.apiUrl}reservations/authenticate?code=${code}`;
    this.httpClient.get(apiUrl, { observe: 'response'}).subscribe( (payload) => {
      this.currentUser = payload.body;
      this.status = payload.status;
      console.log(payload.body);
      console.log(payload.status);

      if (this.status === 200) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    }
    );
  }

  // route guard
  canActivate(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['error']);
      return false;
    }
    return true;
  }
}
