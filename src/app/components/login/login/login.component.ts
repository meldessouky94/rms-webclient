import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
