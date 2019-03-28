import { ComponentFixture, async, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { QuickResViewComponent } from "./quick-res-view.component";
import { ReservationService } from '../../../services/reservation/reservation.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Reservation } from '../../../models/reservation';
import { By } from '@angular/platform-browser';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user';
import { Resource } from '../../../models/resource';

describe('Loading Reservation List for QuickResViewComponent', () => {
  let component: QuickResViewComponent;
  let fixture: ComponentFixture<QuickResViewComponent>;
  let userServiceStub = {
    currentUser: new User()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ ReservationService, {provide: UserService, useValue: userServiceStub} ],
      declarations: [ QuickResViewComponent ],
      imports: [ HttpClientTestingModule ]
    }).compileComponents();
  }));

  it('should send a request to get a list of reservations when the component is created and list multiple reservations if multiple were found', fakeAsync(() => {
    // Initialize mocks for this specific test
    const dummyResList: Reservation[] = [new Reservation(), new Reservation()];
    dummyResList[0].resource = new Resource();
    dummyResList[1].resource = new Resource();
    const mockHttp: HttpTestingController = TestBed.get(HttpTestingController);
    const reservationService: ReservationService = TestBed.get(ReservationService);

    // Initialize the component under testing
    fixture = TestBed.createComponent(QuickResViewComponent);
    component = fixture.componentInstance;
    // Detect changes to get angular to go through the component's life cycle
    fixture.detectChanges();

    // Mock the request and response being sent and received
    const url = `${reservationService.apiUrl}/users?id=${userServiceStub.currentUser.id}`;
    const request: TestRequest = mockHttp.expectOne(url);
    request.flush(dummyResList);
    // Make Angular 'wait' for async logic to finish
    tick();
    
    // Update the component once more to allow the view to re-render
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('#showReservations'));

    // Make assertions
    expect(el).toBeTruthy();
    expect(component.loaded).toBeTruthy();
    expect(component.error).toBeFalsy();
  }));
})
