import { UserService } from './user.service';
import { User } from '../../models/user';
import {Observable, Subject, Subscription} from 'rxjs';

/**
 * Testing various methods in the UserService
 * @author Thiago Mendonca and Olabode Opapeju
 */
describe('UserService', () => {
  let service: UserService;

  // Declare mocks for the service
  let httpMock: {get: jasmine.Spy};
  let routerMock: {navigate: jasmine.Spy};
  let testSub: Subscription;

  // Initialize mocks with default values
  beforeEach(() => {
    httpMock = jasmine.createSpyObj('HttpClient', ['get']);
    routerMock =  jasmine.createSpyObj('Router', ['navigate']);
    service = new UserService(<any> httpMock, <any> routerMock);
  });
  

  // BEGIN TESTS
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('nextCurrentUser', () => {
    it('should set the current user if the passed in user is truthy', (done: DoneFn) => {
      testSub = service.$currentUser.subscribe((u) => {
        expect(u).toBeTruthy();
        done();
      });
      const user: User = new User();
      service.nextCurrentUser(user);
      expect(service.isAuthenticated).toBeTruthy();
      expect(service.currentUser).toBeTruthy();
    });

    it('should set isAuthenticated to be falsy if user passed in is falsy', (done: DoneFn) => {
      testSub = service.$currentUser.subscribe((u) => {
        expect(u).toBeFalsy();
        done();
      });
      service.nextCurrentUser(undefined);
      expect(service.isAuthenticated).toBeFalsy();
      expect(service.currentUser).toBeFalsy();
    });
  });

  describe('getToken', () => {
    it('should handle a status that is 200 by asserting that' +
      '#isAuthenticated is truthy, #loginFailed is falsy, localStorage ' +
      'is called to set token, and #nextCurrentUser is initialized', () => {
      const fakeCode = 'fakeCode';
      const fakeSubject = new Subject<any>();
      const fakeResponse = {
        status: 200,
        body: new User(),
      };
      httpMock.get.and.returnValue(fakeSubject);

      const localStorageSpy = spyOn(localStorage, 'setItem');
      const serviceSpy = spyOn(service, 'nextCurrentUser');

      service.getToken(fakeCode);
      fakeSubject.next(fakeResponse);

      expect(service.status).toBe(200);
      expect(service.isAuthenticated).toBeTruthy();
      expect(service.loginFailed).toBeFalsy();
      localStorageSpy.and.callFake(() => {});
      expect(localStorageSpy.calls.count()).toBe(1);
      expect(serviceSpy).toHaveBeenCalledWith(service.currentUser);
    });

    it('should handle a status that is not 200 by asserting that ' +
      '#isAuthenticated is falsy, localStorage is called to set token,' +
      'and #nextCurrentUser is initialized with as undefined', () => {
      const fakeCode = 'fakeCode';
      const fakeSubject = new Subject<any>();
      const fakeResponse = {
        status: 201,
        body: new User(),
      };
      httpMock.get.and.returnValue(fakeSubject);

      const localStorageSpy = spyOn(localStorage, 'setItem');
      const serviceSpy = spyOn(service, 'nextCurrentUser');

      service.getToken(fakeCode);
      fakeSubject.next(fakeResponse);

      expect(service.status).toBe(201);
      expect(service.isAuthenticated).toBeFalsy();
      localStorageSpy.and.callFake(() => {});
      expect(localStorageSpy.calls.count()).toBe(1);
      expect(serviceSpy).toHaveBeenCalledWith(service.currentUser);
    });

    it('should handle error by asserting #loginFailed to be truthy, and' +
      '#nextCurrentUser is undefined', () => {
      const fakeCode = 'fakeCode';
      const fakeSubject = new Subject<any>();
      const fakeError = new Error('Fake Http Error');

      httpMock.get.and.returnValue(fakeSubject);

      const serviceSpy = spyOn(service, 'nextCurrentUser');

      service.getToken(fakeCode);
      fakeSubject.error(fakeError);

      expect(service.loginFailed).toBeTruthy();
      expect(serviceSpy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('checkSession', () => {
    it('should send a get request, once conditional parameter meets' +
      'requirements: #nextCurrentUser is called, #isAthenticated is truthy,' +
      'and route method is called', () => {
      const fakeString = 'fake string';
      const fakeSubject = new Subject<any>();
      const fakeUser = new User();
      fakeUser.id = '2';

      const serviceSpy = spyOn(service, 'nextCurrentUser');

      httpMock.get.and.returnValue(fakeSubject);

      service.checkSession(fakeString);
      fakeSubject.next(fakeUser);

      expect(httpMock.get.calls.count()).toBe(1);
      expect(serviceSpy).toHaveBeenCalledWith(fakeUser);
      expect(service.isAuthenticated).toBeTruthy();
      expect(routerMock.navigate).toHaveBeenCalled();
    });

    it('should send a get request and an error is handled', () => {
      const fakeString = 'fake string';
      const fakeSubject = new Subject<any>();
      const fakeError = new Error('Fake Http Error');

      const serviceSpy = spyOn(service, 'nextCurrentUser');

      httpMock.get.and.returnValue(fakeSubject);

      service.checkSession(fakeString);
      fakeSubject.error(fakeError);

      expect(httpMock.get.calls.count()).toBe(1);
      expect(serviceSpy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('canActivate', () => {
    it('should navigate with the router and returns a falsy value if isAuthenticated is false', () => {
      service.isAuthenticated = false;
      const testActivate = service.canActivate();
      expect(routerMock.navigate.calls.count()).toBe(1);
      expect(testActivate).toBeFalsy();
    });

    it('should not call route method and assert truthy return value if isAuthenticated is true', () => {
        service.isAuthenticated = true;
        const testActivate = service.canActivate();
        expect(routerMock.navigate.calls.count()).toBe(0);
        expect(testActivate).toBeTruthy();
    });
  });

  describe('logout', () => {
    it('should route to landing page, call localStorage' +
      'to remove token, assert false #isAuthenticate, and' +
      'calls #nextCurrentUser with undefined value', () => {
      const fakeSubject = new Subject<any>();
      httpMock.get.and.returnValue(fakeSubject);
      const localStorageSpy = spyOn(localStorage, 'removeItem');
      const serviceSpy = spyOn(service, 'nextCurrentUser');

      localStorageSpy.and.callFake(() => {});

      service.logout();

      expect(routerMock.navigate.calls.count()).toBe(1);
      expect(localStorageSpy.calls.count()).toBe(1);
      expect(service.isAuthenticated).toBeFalsy();
      expect(serviceSpy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('getUserById', () => {
    it('should send a get request with the user id', () => {
      const targetId = '1';
      httpMock.get.and.returnValue(new Observable<User>());
      testSub = service.getUserById(targetId).subscribe();
      expect(httpMock.get.calls.count()).toBe(1);
    });
  });

  afterEach(() => {
    if (testSub) testSub.unsubscribe();
  });
});
