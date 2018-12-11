import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelReservationPopupComponent } from './cancel-reservation-popup.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';

describe('CancelReservationPopupComponent', () => {
  let component: CancelReservationPopupComponent;
  let fixture: ComponentFixture<CancelReservationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ NgbModal, NgbActiveModal ],
      imports: [ HttpClientModule ],
      declarations: [ CancelReservationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelReservationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
