import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  slackUrl =
    `https://slack.com/oauth/authorize\
?scope=identity.basic,identity.email,identity.team\
&client_id=${environment.slackClientId}\
&redirect_uri=${environment.appUrl}loading`;

  constructor(private router: Router, private userService: UserService) {
    // If already logged in, send to associate home.
    this.userService.$currentUser.subscribe( (user) => {
      if (this.userService.currentUser) {
        this.router.navigate(['home']);
      }
    });
    if (this.userService.currentUser) {
      this.router.navigate(['home']);
    }

  }

  ngOnInit() {
  }

}
