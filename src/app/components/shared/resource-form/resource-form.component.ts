import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { SearchDto } from 'src/app/models/search-dto';
import { Reservation } from 'src/app/models/reservation';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { Router } from '@angular/router';
import { Resource } from 'src/app/models/resource';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {
  campuses: any = [{
    id: 1,
    name: 'USF',
    buildings:
      [{ id: 1, name: 'Main' }, { id: 2, name: 'MUMA college' }]
  },
  {
    id: 2,
    name: 'Reston',
    buildings:
      [{ id: 3, name: 'Office A' }]
  }];
  campusIndex: number;
  buildingId: number;
  purpose;


  loading = false;
  startTimeError = false;
  timeError = false;
  fieldError = false;
  date;
  time1 = '';
  time2 = '';
  selected;
  formInput = new SearchDto();
  resourceForm;

  constructor(private resServ: ReservationService,
    private resourceServ: ResourceService, private router: Router) { }

  ngOnInit() {
    this.resourceServ.getCampuses().subscribe((data) => { this.campuses = data; }, () =>
      // For testing, use this in place of an actual response from the server.
      this.campuses = [
        {
          id: 1,
          name: 'USF',
          buildings:
            [{ id: 1, name: 'Main' }, { id: 2, name: 'MUMA college' }]
        },
        {
          id: 2,
          name: 'Reston',
          buildings:
            [{ id: 3, name: 'Office A' }]
        }]);
  }

  onChange(event) {
    this.selected = true;
    this.campusIndex = Number(this.campusIndex);
  }

  // Converts the timestamp from String to Number
  // Checks to see if your first timestamp(time1) is greater than 9:00 AM
  // and less than the second timestamp(time2)
  // Also checks to see if time2 is greater than time1 and less than 5:00 PM
  timeCheck() {
    const t1 = this.time1.replace(':', '.');
    const t2 = this.time2.replace(':', '.');
    const Num1 = Number(t1);
    const Num2 = Number(t2);

    this.startTimeError = false;
    this.timeError = false;

    if ((9.00 >= Num1) || (Num2 > 17.00)) {
      this.timeError = true;
    } else if (Num2 < Num1) {
      this.startTimeError = true;
    } else {
      this.submit();
    }
    // alert(`Please choose a time frame within 9:00 AM and 5:00 PM`);
  }

  reset() {
    this.date = '';
    this.time1 = '';
    this.time2 = '';
    this.campusIndex = null;
    this.buildingId = null;
    this.formInput = new SearchDto();
  }
  submit() {
    this.formInput.purpose = this.purpose;
    this.formInput.purpose = this.formInput.purpose.toUpperCase();
    this.formInput.campusId = this.campusIndex;
    this.formInput.buildingId = Number(this.buildingId);
    this.formInput.startTime = this.date + 'T' + this.time1 + ':00';
    this.formInput.endTime = this.date + 'T' + this.time2 + ':00';

    const objectKey = Object.values(this.formInput);
    let success = true;
    for (const key of objectKey) {
      if ((key === undefined) || (key === null)) {
        success = false;
      }
    }

    if (!success) {
      // alert(`Please fill in all required input.`);
      this.fieldError = true;
    } else {
      this.loading = true;
      this.fieldError = false;

      console.log('else');
      this.resourceServ.getAvailableResources(this.formInput).subscribe((data) => {
        this.loading = false;
        const reservation = new Reservation();
        reservation.newReservationObject(this.formInput);
        this.resServ.pushNewCurrentReservation(reservation);
        this.resourceServ.pushNewCurrentResourceList(data);
        if (!this.router.url.includes('search')) {
          this.router.navigate(['search']);
        }
      }, () => {
        this.loading = false;
        // For testing, use this in place of an actual response from the server.
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
          'name': 'Cubicle 1',
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
          'name': 'Cubicle 2',
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
          'name': 'Room 1',
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

        const resources = [resource1, resource2, resource3, resource4];
        const reservation = new Reservation();
        reservation.newReservationObject(this.formInput);
        this.resServ.pushNewCurrentReservation(reservation);
        this.resourceServ.pushNewCurrentResourceList(resources);
        if (!this.router.url.includes('search')) {
          this.router.navigate(['search']);
        }
      });
    }
  }

}
