import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { AdminRegistrationService } from '../../../services/admin/admin-registration.service';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {
  admin: Admin;

  firstname: string;
  lastname: string;
  username: string;
  password: string;

  constructor(private adminRegistrationServce: AdminRegistrationService) { }

  onSubmitClick() {
    this.admin.firstname = this.firstname;
    this.admin.lastname = this.lastname;
    this.admin.username = this.username;
    this.admin.password = this.password;

    this.adminRegistrationServce.registerAdmin(this.admin).subscribe(
      data => {this.admin = data; });

      console.log('Submitted Registration!');
  }

  ngOnInit() {
    this.admin = new Admin();
  }

}
