import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
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

  constructor(private resourceServ: ResourceService, private resServ: ReservationService) { }

ngOnInit() {

}

submit() {


this.formInput.startTime = this.date + ' ' + this.time1 + ':000';
this.formInput.endTime = this.date + ' ' + this.time2 + ':000';


this.resServ.getAvailableResources(formInput).subscribe( (data) => { 
  const reservation = new Reservation();
  reservation.newReservationObject(this.formInput);
});
this.resServ.reservation = reservation;

console.log(reservation);
}
}
