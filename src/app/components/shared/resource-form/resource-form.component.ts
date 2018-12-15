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
  campuses: any[];
  campusIndex = 0;
  buildingId: number;
  purpose: any;


  loading = false;
  startTimeError = false;
  timeError = false;
  fieldError = false;
  date: any;
  time1 = '';
  time2 = '';
  selected: any;
  formInput = new SearchDto();
  resourceForm: any;

  constructor(private resServ: ReservationService,
    private resourceServ: ResourceService, private router: Router) { }

  ngOnInit() {
    this.resourceServ.getCampuses().subscribe((data) => { this.campuses = data; }, () => {
      alert('Error loading campuses! Please try again.');
    });
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

    if ((9.00 > Num1) || (Num2 > 17.00)) {
      this.timeError = true;
    } else if (Num2 <= Num1) {
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
        alert('A server error has occured! Please try again later.');
      });
    }
  }

}
