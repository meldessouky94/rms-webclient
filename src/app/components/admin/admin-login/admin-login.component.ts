import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../models/admin';
import { AdminLoginService } from '../../../services/admin/admin-login.service';
import { DataService } from '../../../services/shared/data.service';
import { StringDataService } from 'src/app/services/shared/string-data.service';


/**
 * Component
 */
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  admin: Admin;
  username: string;
  password: string;
  errorMessage: string;

  constructor(private adminLoginService: AdminLoginService,
    private data: DataService,
    private stringData: StringDataService) {
     }

  /**
   * When user clicks on submit, sends form data to controller
   */
  onSubmitClick() {
    this.admin = new Admin();
    this.admin.firstname = '';
    this.admin.lastname = '';
    this.admin.username = this.username;
    this.admin.password = this.password;

    this.adminLoginService.validateUser(this.admin).subscribe(
      data => this.setAdmin(data));

  }

  setAdmin(data: Admin) {
    this.admin = data;

    if (this.admin) {
      this.runLoginEvents();
    } else {
      this.errorMessage = 'Invalid Login';
    }
  }

  /**
   * Runs login updates
   */
  runLoginEvents() {
    this.data.changeBoolean(true);
    sessionStorage.setItem('admin', JSON.stringify(this.admin));
    this.stringData.changeMessage('Admin - Resource Force');
  }

}
