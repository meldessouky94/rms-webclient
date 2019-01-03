import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../../../services/shared/data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  isCollapsed = true;

  authenticated = false;
  userSubscription: Subscription;
  isUserAdmin = false;

  constructor(private userService: UserService,
    private detector: ChangeDetectorRef, public router: Router,
    private data: DataService,
   ) {
      console.log('nav-bar constructor');
      this.userSubscription = this.userService.$currentUser.subscribe( (user) => {
      this.authenticated = this.userService.isAuthenticated;
      console.log('nav-bar subscription');
      console.log(this.authenticated);
      // Navbar was not updating consistently, so this is
      // needed to be sure the links are shown when the user
      // is authenticated.
      this.detector.detectChanges();
    });
  }
  openAdminPortal() {
    this.router.navigate(['adminLogin']);
    console.log('Opening Admin Portal');
  }
  logout() {
    this.userService.logout();
  }
  ngOnInit() {

    console.log('nav-bar init');

    this.authenticated = this.userService.isAuthenticated;

    this.data.currentMessage.subscribe(message => this.authenticated = message);
    this.data.currentMessage.subscribe(message => this.isUserAdmin = message);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }


}
