import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public isCollapsed = true;
  constructor(private route: ActivatedRoute) {
    const open = this.route.snapshot.paramMap.get('openForm');
    if (open) {
      this.isCollapsed = false;
    }
   }

  ngOnInit() {
  }

}
