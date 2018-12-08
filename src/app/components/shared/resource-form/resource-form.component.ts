import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { SearchDto } from 'src/app/models/search-dto';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {

  date;
  time1;
  time2;

  formInput = new SearchDto();

  constructor(private resServ: ReservationService) { }

ngOnInit() {

}

submit() {


this.formInput.startTime = this.date + ' ' + this.time1 + ':000';
this.formInput.endTime = this.date + ' ' + this.time2 + ':000';
// cycle through form input to make sure each input is used
for (const i in this.formInput) {
  if (i) {
    console.log(this.formInput);
    console.log(i);
    console.log(this.formInput[i]);
  }
}

this.resServ.getAvailableResources(this.formInput).subscribe( (data) => {
  const reservation = new Reservation();
  reservation.newReservationObject(this.formInput);
  this.resServ.pushNewCurrentReservation(reservation);
  this.resServ.pushNewCurrentResourceList(data);
});
}
}
