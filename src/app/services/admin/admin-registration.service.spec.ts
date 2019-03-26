import { AdminRegistrationService } from './admin-registration.service';
import { Admin } from 'src/app/models/admin';
import { Observable, Subscription } from 'rxjs';

describe('AdminRegistrationService', () => {
  let adminRegisterService: AdminRegistrationService;
  let httpClientSpy: { post: jasmine.Spy };
  let testSub: Subscription;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    adminRegisterService = new AdminRegistrationService(<any>httpClientSpy);
  });

  it('should be created', () => {
    expect(adminRegisterService).toBeTruthy();
  });

  it('should make a post call once to registerAdmin', () => {
    const dummyAdmin: Admin = new Admin();
    httpClientSpy.post.and.returnValue(new Observable<Admin>());
    testSub = adminRegisterService.registerAdmin(dummyAdmin).subscribe();
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  afterEach(() => {
    if (testSub) testSub.unsubscribe();
  });
});
