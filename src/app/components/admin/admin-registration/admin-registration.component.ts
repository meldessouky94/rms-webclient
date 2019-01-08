import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { AdminRegistrationService } from '../../../services/admin/admin-registration.service';

/**
 * Component
 */
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
  password1: string;
  password2: string;
  validationMessage: string;

  constructor(private adminRegistrationServce: AdminRegistrationService) { }

  /**
   * When submit is clicked the input is checked for validation and a register admin
   * request is sent if the input is valid.
   * @author Jaron | Java-Nick-1811 | 1/8/2019
   */
  onSubmitClick() {
    if (this.validInput()) {

      this.admin.firstname = this.firstname;
      this.admin.lastname = this.lastname;
      this.admin.username = this.username;
      this.admin.password = this.password1;

      this.adminRegistrationServce.registerAdmin(this.admin).subscribe(data => { this.admin = data; });

    }
  }

  /**
   * Checks that all input is valid on the client side including having non null values
   * having an @revature.com email and making sure that the passwords match
   * @returns true if all registration input is valid
   * @author Jaron | Java-Nick-1811 | 1/8/2019
   */
  validInput(): boolean {

    if (!this.firstname) {
      this.validationMessage = 'Please enter a first name';
      return false;
    }
    if (!this.lastname) {
      this.validationMessage = 'Please enter a last name';
      return false;
    }
    if (!this.username || !this.username.endsWith('@revature.com')) {
      this.validationMessage = 'Please enter a valid @revature.com email address for your username';
      return false;
    }

    return this.validatePassword();

  }

  /**
   * Checks that the passwords are at leat 8 characters long and that they match.
   * @returns true if the passwords are long enough and match
   * @author Jaron | Java-Nick-1811 | 1/8/2019
   */
  validatePassword(): boolean {

    if (!this.password1 || this.password1.length < 8) {
      this.validationMessage = 'The password must be at least 8 characters';
      return false;
    }

    if (this.password1 === this.password2) {
      this.validationMessage = '';
      return true;
    }

    this.validationMessage = 'The passwords do not match';
    return false;
  }

  /**
   * on init
   */
  ngOnInit() {
    this.admin = new Admin();
  }

}
