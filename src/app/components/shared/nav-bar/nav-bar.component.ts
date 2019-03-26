import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IsAdminBehaviorSetService } from '../../../services/shared/is-admin-behavior-set.service';
import { TitleBehaviorSetService } from '../../../services/shared/title-behavior-set.service';

/**
 * nav-bar component displays the navigation bar
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  isCollapsed = true;

  authenticated = false;
  userSubscription: Subscription;
  isUserAdmin = false;
  title: string;

  constructor(
    private userService: UserService,
    private detector: ChangeDetectorRef,
    public router: Router,
    private isAdmin: IsAdminBehaviorSetService,
    private pageTitle: TitleBehaviorSetService,
   ) { }

  /**
   * Logout the user
   */
  logout() {
    this.userService.logout();
    this.title = 'Resource Force';

    sessionStorage.clear();
  }

  /**
   * On initialization of the navigation bar, verify that the user is authenticated.
   */
  ngOnInit() {

    this.authenticated = this.userService.isAuthenticated;

    this.isAdmin.currentMessage.subscribe((message) => this.authenticated = message);
    this.isAdmin.currentMessage.subscribe((message) => this.isUserAdmin = message);
    this.pageTitle.currentMessage.subscribe((message) => this.title = message);
    this.title = 'Resource Force';
    this.listenForUserChanges();

  }

  listenForUserChanges() {
    this.userSubscription = this.userService.$currentUser.subscribe( (user) => {

      this.authenticated = this.userService.isAuthenticated;
      /* Navbar was not updating consistently, so this is
       * needed to be sure the links are shown when the user
       * is authenticated.
       */
      this.detector.detectChanges();
    });
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
