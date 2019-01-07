import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {

  slackUrl = `https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team&client_id=${environment.slackClientId}`;

  loginFailed: boolean;
  constructor(private userService: UserService) {
    this.loginFailed = userService.loginFailed;
   }

  ngOnInit() {
  }

}
