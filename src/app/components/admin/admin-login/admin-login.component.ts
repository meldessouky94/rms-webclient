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
export class AdminLoginComponent implements OnInit {
  admin: Admin;
  username: string;
  password: string;

  constructor(private adminLoginService: AdminLoginService,
    private data: DataService,
    private stringData: StringDataService) { }

  /**
   * When user clicks on submit, sends form data to controller
   */
  onSubmitClick() {
    let isValidAdmin = false;

    this.admin.firstname = '';
    this.admin.lastname = '';
    this.admin.username = this.username;
    this.admin.password = this.password;

    // this.adminLoginService.validateUser(this.admin).subscribe(
    //   data => { this.admin = data; });

    if (isValidAdmin) {
      console.log('IS VALID ADMIN');
      this.runLoginEvents();
    } else {
      console.log('IS NOT VALID ADMIN');
    }
  }

  /**
   * Runs login updates
   */
  runLoginEvents() {
    this.data.changeBoolean(true);
    this.stringData.changeMessage('Admin - Resource Force');
  }

  /**
   * on init
   */
  ngOnInit() {
    this.admin = new Admin();
  }

}
