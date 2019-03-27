import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';

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
    console.log("nav-bar constructor");
    this.userSubscription = this.userService.$currentUser.subscribe( (user) => {
      this.authenticated = this.userService.isAuthenticated;
      console.log("nav-bar subscription");
      console.log(this.authenticated);
      // Navbar was not updating consistently, so this is
      // needed to be sure the links are shown when the user
      // is authenticated.
      this.detector.detectChanges();
    });
  }
  
  logout() {
    this.userService.logout();
  }
  ngOnInit() {
    console.log("nav-bar init");

    this.authenticated = this.userService.isAuthenticated;
  }

  ngOnDestroy() {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
}
