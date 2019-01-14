import { Injectable } from '@angular/core';
import { Admin } from '../../models/admin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AdminRegistrationService {
  readonly url: string = `${environment.apiUrl}${environment.serviceContext.adminRegistration}/registration`;

  constructor(private http: HttpClient) { }

  registerAdmin(admin: Admin) {
    return this.http.post<Admin>(this.url, admin);
  }
}
