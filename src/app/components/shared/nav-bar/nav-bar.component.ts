import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';

/**
 * nav-bar component displays the navigation bar
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  isCollapsed = true;

  authenticated = false;
  userSubscription: Subscription;

  constructor(private userService: UserService,
    private detector: ChangeDetectorRef) {
    this.userSubscription = this.userService.$currentUser.subscribe( (user) => {
      this.authenticated = this.userService.isAuthenticated;
      // Navbar was not updating consistently, so this is
      // needed to be sure the links are shown when the user
      // is authenticated.
      this.detector.detectChanges();
    });
  }

  /**
   * Logout the user
   */
  logout() {
    this.userService.logout();
  }

  /**
   * On initialization of the navigation bar, verify that the user is authenticated.
   */
  ngOnInit() {
    this.authenticated = this.userService.isAuthenticated;
  }

  /**
   * On destroy, unsubscribe from the user service.
   */
  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
