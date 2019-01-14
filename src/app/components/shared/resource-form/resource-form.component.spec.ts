import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { ResourceFormComponent } from './resource-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

describe('ResourceFormComponent', () => {
  let component: ResourceFormComponent;
  let fixture: ComponentFixture<ResourceFormComponent>;
  let resourceTestBedService: ResourceService;
  let reservationTestBedService: ReservationService;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ResourceFormComponent],
      providers: [ ReservationService,
        ResourceService ],
      imports: [HttpClientModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    resourceTestBedService = TestBed.get(ResourceService);
    reservationTestBedService = TestBed.get(ReservationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Resource Service injected and testBed Service are same instance',
    inject([ResourceService], (injectedService: ResourceService) => {
      expect(injectedService).toBe(resourceTestBedService);
    }),
  );

  it('Reservation Service injected and testBed Service are same instance',
    inject([ReservationService], (injectedService: ReservationService) => {
      expect(injectedService).toBe(reservationTestBedService);
    }),
  );

});
