import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ResourceFormComponent } from '../../shared/resource-form/resource-form.component';
import { ViewResourcesComponent } from '../view-resources/view-resources.component';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { UserService } from 'src/app/services/user/user.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceService } from 'src/app/services/resource/resource.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach((async () => {
    await (TestBed.configureTestingModule({
      providers: [ NgbModal,
        NgbActiveModal,
        UserService,
        ReservationService,
        ResourceService ],
      declarations: [ SearchComponent,
        ResourceFormComponent,
        ViewResourcesComponent,
      ],
    }))
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });
});
