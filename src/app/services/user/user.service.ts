import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router, CanActivate } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  status: number;
  isAuthenticated: boolean;
  // For testing:
  // currentUser: any = {id: 'a2'};
  // For release
  currentUser: any;
  $getTokenResult = new Subject<any>();
  
  constructor(private httpClient: HttpClient, public router: Router) { }

  getToken(code) {
    const apiUrl = `${environment.apiUrl}reservations/authorization?code=${code}`;
    this.httpClient.get(apiUrl, { observe: 'response'}).subscribe( (payload) => {
      this.status = payload.status;

      if (this.status === 200) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
      this.currentUser = payload.body;
      // This alerts the loading component that the request is complete and to update
      this.$getTokenResult.next(this.status);
    }, (err) => {
    // Error handling; loading component will still need to know when this is complete
    // if there is an error
      this.$getTokenResult.next(err.status);
    });
  }

  checkSession() {
    // Get local storage USER object
    // (this is NOT an ideal way to handle this.)
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
