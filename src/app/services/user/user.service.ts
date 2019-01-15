import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CanActivate, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements CanActivate {
  static readonly userToken = 'user-token';

  status: number;
  isAuthenticated: boolean;
  loginFailed = false;
  currentUser: User;
  $currentUser = new Subject<User>();
  apiUrl = `${environment.apiUrl}${environment.serviceContext.reservation}`;
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

  /**
   * This gets the user information from SLACK, and actually have nothing to do with getting a token
   * because the backend gets the token from slack, not the front end.
   * @param code gets the user information from SLACK
   */
  getToken(code) {
    const apiUrl = `${environment.apiUrl}${environment.serviceContext.reservation}/users/authorization?code=${code}`;

    this.httpClient.get(apiUrl, { observe: 'response'}).subscribe( (payload) => {
      this.status = payload.status;

      if (this.status === 200) {
        this.isAuthenticated = true;
        this.loginFailed = false;
      } else {
        this.isAuthenticated = false;
      }
      this.currentUser = new User(payload.body);
      localStorage.setItem(UserService.userToken, this.currentUser.token);
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

  /**
   * Gets the token in local storage created in the "getToken" method above
   * if the user had logged in before and checks the session by sending it to
   * the database.
   * @param token takes in a token value for the user
   */
  checkSession(token: string) {
    const apiUrl = `${environment.apiUrl}${environment.serviceContext.reservation}/users/rememberme`;

    this.httpClient.get<User>(apiUrl, {
      params: new HttpParams().set('token', token),
    }).subscribe( (user) => {
      if (user.id) {
        this.nextCurrentUser(user);
        this.isAuthenticated = true;
        this.router.navigate(['/']);
      }
    }, () =>  this.nextCurrentUser(undefined),
    );

  }

  /**
   * route guard to make sure user is authenticated before accessing end points
   * @returns boolean value, false if user is not authenticated, else true
   */
  canActivate(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['error']);
      return false;
    }
    return true;
  }

  /**
   * logout the user by removing them from local storage and redirect to the root page
   */
  logout() {
    const apiUrl = `${environment.apiUrl}${environment.serviceContext.reservation}/users/logout`;

    this.httpClient.get<User>(apiUrl, {
      params: new HttpParams().set('token', localStorage.getItem(UserService.userToken)),
    }).subscribe();

    localStorage.removeItem(UserService.userToken);
    this.router.navigate(['/']);
    this.isAuthenticated = false;
    this.nextCurrentUser(undefined);
  }

  getUserById(userId: string) {
    const URL = `${this.apiUrl}/users/${userId}`;
    console.log('User URL: ' + URL);
    return this.httpClient.get<User>(URL);
   }
}
