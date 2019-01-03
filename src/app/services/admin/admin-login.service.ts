import { Injectable } from '@angular/core';
import { Admin } from '../../models/admin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  readonly url: string = '';

  constructor(private http: HttpClient) { }

  validateUser(admin: Admin) {
    return this.http.post(this.url, admin);
  }
}
