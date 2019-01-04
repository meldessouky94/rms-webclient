import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../../../services/shared/data.service';
import { StringDataService } from '../../../services/shared/string-data.service';

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
  title: string;

  constructor(private userService: UserService,
    private detector: ChangeDetectorRef, 
    public router: Router,
    private data: DataService,
    private stringData: StringDataService
   ) {
      this.userSubscription = this.userService.$currentUser.subscribe( (user) => {
      this.authenticated = this.userService.isAuthenticated;
      /* Navbar was not updating consistently, so this is
       * needed to be sure the links are shown when the user
       * is authenticated.
       */
      this.detector.detectChanges();
    });
  }

  logout() {
    this.userService.logout();
    this.title = 'Resource Force';
  }
  ngOnInit() {

    this.authenticated = this.userService.isAuthenticated;

    this.data.currentMessage.subscribe(message => this.authenticated = message);
    this.data.currentMessage.subscribe(message => this.isUserAdmin = message);
    this.stringData.currentMessage.subscribe(message => this.title = message);
    this.title = 'Resource Force';

  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }


}
