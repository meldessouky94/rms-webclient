import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-verified',
  templateUrl: './admin-verified.component.html',
  styleUrls: ['./admin-verified.component.css']
})
export class AdminVerifiedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * Navigates the user back to the login screen.
   *
   * @author Jaron | Java-Nick-1811 | 1/14/2019
   */
  goToLogin() {
    this.router.navigate(['adminLogin']);
  }

}
