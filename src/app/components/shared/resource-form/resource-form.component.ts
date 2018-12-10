import { Component, OnInit} from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { SearchDto } from 'src/app/models/search-dto';
import { Reservation } from 'src/app/models/reservation';
import { ResourceService } from 'src/app/services/resource/resource.service';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {
  campuses = [
    { id: 1,
      name: 'USF',
      buildings:
      [{id: 1, name: 'Main'}, {id: 2, name: 'MUMA college'}]},
    { id: 2,
      name: 'Reston',
      buildings:
      [{id: 3, name: 'Office A'}]
  }];
  campusIndex: number;
  buildingId: number;
  purpose;


  date;
  time1;
  time2;
  selected;
  formInput = new SearchDto();
  resourceForm;

  constructor(private resServ: ReservationService,
    private resourceServ: ResourceService) { }

    ngOnInit() {

    }

    onChange(event) {
      this.selected = true;
      this.campusIndex = Number(this.campusIndex);
    }



    submit() {

    this.formInput.purpose = this.purpose;
    this.formInput.campusId = this.campusIndex;
    this.formInput.buildingId = Number(this.buildingId);
    this.formInput.startTime = this.date + ' ' + this.time1 + ':000';
    this.formInput.endTime = this.date + ' ' + this.time2 + ':000';

    const objectKey = Object.values(this.formInput);

    for (const key of objectKey) {

     if ((key === undefined) || (key === null)) {

       alert(`Please fill in all input ... thanks`);
       this.resourceForm = document.getElementById('resourceForm');
       this.resourceForm.reset();
       break;
     } else {
       console.log('else');
      this.resourceServ.getAvailableResources(this.formInput).subscribe( (data) => {
            const reservation = new Reservation();
            reservation.newReservationObject(this.formInput);
            this.resServ.pushNewCurrentReservation(reservation);
            this.resourceServ.pushNewCurrentResourceList(data);
          });
      }
    }
  }
}

