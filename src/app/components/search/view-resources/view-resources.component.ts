import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmCreateComponent } from '../confirm-create/confirm-create.component';
import { Reservation } from 'src/app/models/reservation';
import { Resource } from 'src/app/models/resource';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-resources',
  templateUrl: './view-resources.component.html',
  styleUrls: ['./view-resources.component.sass']
})
export class ViewResourcesComponent implements OnInit, OnDestroy {

reservationInfo: Reservation;
resources: Resource[];

resourceSubscription: Subscription;
  constructor(private reservationService: ReservationService,
              private modalService: NgbModal,
              private resourceService: ResourceService) { }

              // Function that will open a modal with Reservation info and will appear updated
              // with the selectedResource being the Resource assigned to the Reservation.
  open(selectedResource: any) {
    const reservation = this.reservationService.currentReservation;
    console.log('open function');
    console.log(selectedResource);
    reservation.resource = selectedResource;
    const modalRef = this.modalService.open(ConfirmCreateComponent, {centered: true});
    modalRef.componentInstance.reservation = reservation;
  }

  ngOnInit() {
    this.resourceSubscription = this.resourceService.$currentResourceList.subscribe((resources) => {
      this.resources = resources;
    }
    );

  }

  ngOnDestroy() {
    this.resourceSubscription.unsubscribe();
    }
  }
