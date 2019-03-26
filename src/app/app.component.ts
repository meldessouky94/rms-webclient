import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rms-webclient';
  loading: boolean;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getLoggedInUser()
  }

  /**
   * Gets the currently logged in user utilizing the local storage to get a user token
   * This is done in app component so we can get the logged in user upon application load
   */
  getLoggedInUser() {
    // Subscribe to changes in the current user
    // Get the token from local storage
    const token = localStorage.getItem('user-token');
    if (token) {
      this.loading = true;
      // Subscribe to the next change in the currentUser
      // -- only the next change. Unsubscribe once a change occurs
      const subscription = this.userService.$currentUser.subscribe((user) => {
        this.loading = false;
        subscription.unsubscribe();
      }, () =>
          this.loading = false);

      // If there is a token, send a request to the server for the user's information.
      this.userService.checkSession(token);
    }
  }

}
