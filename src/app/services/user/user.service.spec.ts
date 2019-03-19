import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../models/user';

describe('UserService', () => {
  let service: UserService
  let httpMock: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserService],
    })
    service = TestBed.get(UserService)
    httpMock = TestBed.get(HttpTestingController)
  });

  /**
   * Generated Test
   * Makes sure that the service is initialized by Angular
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * nextCurrentUser Test
   * Tests that is authenticated, currentUser, and $currentUser are all properly set when user is
   * passed in as a truthy value.
   */
  it('#nextCurrentUser should set the current user if the passed in user is truthy', () => {
    let user: User = new User();
    service.nextCurrentUser(user)
    let testSub = service.$currentUser.subscribe(u => {
      expect(u).toBeTruthy()
      testSub.unsubscribe()
    })
    expect(service.isAuthenticated).toBeTruthy()
    expect(service.currentUser).toBeTruthy()
  })

  /**
   * nextCurrentUser Test
   * Tests that is authenticated, currentUser, and $currentUser are all properly set when user is
   * passed in as a falsy value.
   */
  it('#nextCurrentUser should set isAuthenticated to be falsy if user passed in is falsy', () => {
    service.nextCurrentUser(undefined)
    const testSub = service.$currentUser.subscribe((u) => {
      expect(u).toBeFalsy()
      testSub.unsubscribe();
    })
    expect(service.isAuthenticated).toBeFalsy()
    expect(service.currentUser).toBeFalsy();
  })

  /**
   * getUserById Test
   * Tests that getUserId sends a get request and receives a truthy user object
   */
  it('#getUserById should send a get request with the user id ', () => {
    const expectedUser: User = new User();
    const targetId = '1';
    service.getUserById(targetId).subscribe( (user) => {
      expect(user).toBeTruthy();
    });
    const request = httpMock.expectOne(`${service.apiUrl}/users/${targetId}`);
    expect(request.request.method).toBe('GET');

    request.flush(expectedUser);
  });
});
