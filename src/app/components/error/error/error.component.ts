import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {

  loginFailed: boolean;
  constructor(private userService: UserService) {
    this.loginFailed = userService.loginFailed;
   }

  ngOnInit() {
  }

}
