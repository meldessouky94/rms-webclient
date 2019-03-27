import { ComponentFixture, async, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { QuickResViewComponent } from "./quick-res-view.component";
import { ReservationService } from '../../../services/reservation/reservation.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Reservation } from '../../../models/reservation';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

describe('Loading Reservation List for QuickResViewComponent', () => {
  let component: QuickResViewComponent;
  let fixture: ComponentFixture<QuickResViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ ReservationService ],
      declarations: [ QuickResViewComponent ],
      imports: [ HttpClientTestingModule ]
    }).compileComponents();
  }));

  fit('should send a request to get a list of reservations when the component is created and list multiple reservations if multiple were found', fakeAsync(() => {
    const fakeSubject = new Subject<Reservation[]>();
    const dummyResList: Reservation[] = [new Reservation(), new Reservation()]

    const httpGetSpy = spyOn(HttpClient.prototype, 'get');
    httpGetSpy.and.returnValue(fakeSubject);
    
    fixture = TestBed.createComponent(QuickResViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fakeSubject.next(dummyResList);
    tick();
    
    // const multiRes = fixture.debugElement.query(By.css('#error'));
    // console.log(fixture.componentInstance)
    // console.log(multiRes);

    expect(httpGetSpy).toHaveBeenCalled();
    expect(component.loaded).toBeTruthy();
    expect(component.error).toBeFalsy();
  }));
})
