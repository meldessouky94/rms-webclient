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
      imports: [
        HttpClientModule,
      ],
    })
    service = TestBed.get(UserService)
    httpMock = TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

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

  it('#nextCurrentUser should set isAuthenticated to be falsy if user passed in is falsy', () => {
    service.nextCurrentUser(undefined)
    let testSub = service.$currentUser.subscribe(u => {
      expect(u).toBeFalsy()
      testSub.unsubscribe()
    })
    expect(service.isAuthenticated).toBeFalsy()
    expect(service.currentUser).toBeFalsy()
  })


});
