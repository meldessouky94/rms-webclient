import { TestBed } from '@angular/core/testing';

import { AdminLoginService } from './admin-login.service';
import { Admin } from 'src/app/models/admin';
import { Observable } from 'rxjs';

describe('AdminLoginService', () => {
  let adminLoginService: AdminLoginService;
  let httpClientSpy: {post: jasmine.Spy};

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    adminLoginService = new AdminLoginService(<any> httpClientSpy);
  });

  it('should be created', () => {
    expect(adminLoginService).toBeTruthy();
  });
  it('should make a post request to validateUser', () => {
    const dummyAdmin: Admin = new Admin();

    httpClientSpy.post.and.returnValue(new Observable<Admin>());
    adminLoginService.validateUser(dummyAdmin).subscribe();
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });
});
