import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { QuickResViewComponent } from './quick-res-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

describe('QuickResViewComponent', () => {
  let component: QuickResViewComponent;
  let fixture: ComponentFixture<QuickResViewComponent>;
  let testBedService: ReservationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuickResViewComponent],
      providers: [ReservationService],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(QuickResViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedService = TestBed.get(ReservationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Service injected and testBed Service are same instance',
    inject([ReservationService], (injectedService: ReservationService) => {
      expect(injectedService).toBe(testBedService);
    })
  );
});
