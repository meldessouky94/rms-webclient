import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations = [
    {
      purpose: 'panel',
      campus: 'USF',
      building: 'NEC',
      name: 'Greg',
      startTime: '2018 Dec 03 12:30:00',
      endTime: '2018 Dec 03 13:30:00'
    },
    {
      purpose: 'interview',
      campus: 'USF',
      building: 'Bunker',
      name: 'Yuki',
      startTime: '2018 Dec 05 09:30:00',
      endTime: '2018 Dec 05 10:30:00'
    },
    {
      purpose: 'panel',
      campus: 'USF',
      building: 'NEC',
      name: 'Jonathan',
      startTime: '2018 Dec 04 13:30:00',
      endTime: '2018 Dec 04 14:30:00'
    },
  ];
  // id: number;
  // purpose: string;
  // startTime: string;
  // endTime: string;
  // resource: Resource;
  // userId: number;
  // cancelled: boolean;
  // approved: boolean;
  time = { hour: 9, minute: 30 };
  meridian = true;
  constructor() { }

  ngOnInit() {
  }


  toggleMeridian() {
    this.meridian = !this.meridian;
  }

}
