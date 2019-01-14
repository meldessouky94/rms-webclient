import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { AdminRegistrationService } from '../../../services/admin/admin-registration.service';

/**
 * Component for registering new admins
 */
@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css'],
})
export class AdminRegistrationComponent implements OnInit {
  admin: Admin;

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  password1: string;
  password2: string;

  constructor(private adminRegistrationServce: AdminRegistrationService) { }

  /**
   * Determines whether submit click on
   */
  onSubmitClick() {
    if (this.validatePassword()) {

      this.admin.firstname = this.firstname;
      this.admin.lastname = this.lastname;
      this.admin.username = this.username;
      this.admin.password = this.password;

    } else {
      // TODO: sent "Passwords do not match response..."
    }
  }

  /**
   * Validates password
   * @returns true if password
   */
  validatePassword(): boolean {
    let isValid: boolean;
    isValid = false;

    if (this.password1 === this.password2) {
      isValid = true;
    }

    return isValid;
  }

  /**
   * on init
   */
  ngOnInit() {
    this.admin = new Admin();
  }

}
