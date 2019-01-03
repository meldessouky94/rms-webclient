import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../models/admin';
import { AdminLoginService } from '../../../services/admin/admin-login.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  admin: Admin;
  username: string;
  password: string;

  constructor(private adminLoginService: AdminLoginService) { }

  onSubmitClick() {
    this.admin.firstname = '';
    this.admin.lastname = '';
    this.admin.username = this.username;
    this.admin.password = this.password;

    this.adminLoginService.validateUser(this.admin).subscribe(
      data => { this.admin = data; });

    console.log('Submitted Login!');
  }

  ngOnInit() {
    this.admin = new Admin();
  }

}
