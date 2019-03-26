import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ConfirmCreateComponent } from './confirm-create.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

describe('ConfirmCreateComponent', () => {
  let component: ConfirmCreateComponent;
  let fixture: ComponentFixture<ConfirmCreateComponent>;
  let reservationTestBedService: ReservationService;
  let userTestBedService: UserService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ NgbModal,
        NgbActiveModal,
        UserService,
        ReservationService ],
        declarations: [ ConfirmCreateComponent ],
        imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    reservationTestBedService = TestBed.get(ReservationService);
    userTestBedService = TestBed.get(UserService);
  });

  
  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('User Service injected and testBed Service are same instance',
    inject([UserService], (injectedService: UserService) => {
      expect(injectedService).toBe(userTestBedService);
    })
  );


});
