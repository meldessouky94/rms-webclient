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
  styleUrls: ['./view-resources.component.css']
})
export class ViewResourcesComponent implements OnInit, OnDestroy {

reservationInfo: Reservation;
resources: Resource[];

resourceSubscription: Subscription;
  constructor(private reservationService: ReservationService,
              private modalService: NgbModal,
              private resourceService: ResourceService) {
///////////////////////////////////// TESTING ONLY 
//////////////
                const resource1: Resource = {
                  'id': 1,
                  'type': 'cubicle',
                  'buildingId': 1,
                  'enabled': true,
                  'retired': false,
                  'availableStartDate': '',
                  'reservableAfter': '',
                  'reservableBefore': '',
                  'availableDays': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
                  'name': 'Block A',
                  'hasEthernet': true,
                  'hasComputer': true,
                  'numberOfOutlets': 2,
                  'hasMicrophone': true
                };
        
                const resource2: Resource = {
                  'id': 2,
                  'type': 'cubicle',
                  'buildingId': 1,
                  'enabled': true,
                  'retired': false,
                  'availableStartDate': '',
                  'reservableAfter': '',
                  'reservableBefore': '',
                  'availableDays': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
                  'name': 'Block b',
                  'hasEthernet': false,
                  'hasComputer': true,
                  'numberOfOutlets': 3,
                  'hasMicrophone': true
                };
        
                const resource3: Resource = {
                  'id': 3,
                  'type': 'room',
                  'buildingId': 2,
                  'enabled': true,
                  'retired': false,
                  'availableStartDate': '',
                  'reservableAfter': '',
                  'reservableBefore': '',
                  'availableDays': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
                  'name': 'Room 123',
                  'hasEthernet': true,
                  'hasComputer': false,
                  'numberOfOutlets': 4,
                  'hasMicrophone': true
                };
        
                const resource4: Resource = {
                  'id': 4,
                  'type': 'room',
                  'buildingId': 1,
                  'enabled': true,
                  'retired': false,
                  'availableStartDate': '',
                  'reservableAfter': '',
                  'reservableBefore': '',
                  'availableDays': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
                  'name': 'Room 2',
                  'hasEthernet': true,
                  'hasComputer': true,
                  'numberOfOutlets': 6,
                  'hasMicrophone': false
                };
                this.resources = [resource1, resource2, resource3, resource4];




                ///////////// END TESTING 
               }

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
    if (this.resourceService.currentResourceList) {
      this.resources = this.resourceService.currentResourceList;
    }
  }

  ngOnDestroy() {
    this.resourceSubscription.unsubscribe();
    // When the user navigates away from the page, destroy the entire list of resources.
    this.resourceService.pushNewCurrentResourceList(null);
    }
  }
