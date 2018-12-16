import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router, CanActivate } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  status: number;
  isAuthenticated: boolean;
  loginFailed = false;
  // For testing:
  // currentUser: any = {id: 'a2'};
  // For release
  currentUser: User;
  $currentUser = new Subject<User>();
  
  constructor(private httpClient: HttpClient, public router: Router) { }

  nextCurrentUser(user: User) {
    // If the user passed in is null, they are not authenticated.
    if (!user) {
      this.isAuthenticated = false;
    } else {
      this.isAuthenticated = true;
    }
    this.currentUser = user;
    this.$currentUser.next(user);
  }
  // This gets the user information from SLACK, and actually have nothing to do with getting a token
  // because the backend gets the token from slack, not the front end.
  getToken(code) {
   const apiUrl = `${environment.apiUrl}reservations/users/authorization?code=${code}`;
///////////// TESTING:
    // const apiUrl = `http://localhost:5000/users/authorization?code=${code}`;
    this.httpClient.get(apiUrl, { observe: 'response'}).subscribe( (payload) => {
      this.status = payload.status;

      if (this.status === 200) {
        this.isAuthenticated = true;
        this.loginFailed = false;
      } else {
        this.isAuthenticated = false;
      }
      this.currentUser = <User>payload.body;
      localStorage.setItem("user-token", this.currentUser.token);
      // This alerts the loading component that the request is
      // complete and to update
      this.nextCurrentUser(this.currentUser);
    }, (err) => {
    // Error handling; loading component will still need to know when this is complete
    // if there is an error -- so it will subscribe to the current user.
      this.loginFailed = true;
      this.nextCurrentUser(undefined);
    });
  }

  // Gets the token in local storage created in the "getToken" method above 
  // if the user had logged in before and checks the session by sending it to
  // the databse.
  checkSession(token: string) {
   const apiUrl = `${environment.apiUrl}reservations/users/rememberme`;
///////////// TESTING:
    // const apiUrl = `http://localhost:5000/users/rememberme`;

    this.httpClient.get<User>(apiUrl, {
      params: new HttpParams().set('token', token)
    }).subscribe( (user) => {
      if (user.id) {
        this.nextCurrentUser(user);
        this.isAuthenticated = true;
      }
    });

  }

  // route guard
  canActivate(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['error']);
      return false;
    }
    return true;
  }

  logout() {
     const apiUrl = `${environment.apiUrl}reservations/users/logout`;
/////////////// TESTING:
//     const apiUrl = `http://localhost:5000/users/logout`;

    this.httpClient.get<User>(apiUrl, {
      params: new HttpParams().set('token', localStorage.getItem('user-token'))
    }).subscribe();
    
    localStorage.removeItem('user-token');
    this.router.navigate(['/']) 
    this.isAuthenticated = false;
    this.nextCurrentUser(undefined);
  }
}
