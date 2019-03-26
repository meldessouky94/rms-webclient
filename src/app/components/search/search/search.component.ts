import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * search component collapses or reveals the reservation form
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  public isCollapsed = true;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const open = this.route.snapshot.paramMap.get('openForm');
    if (open) {
      this.isCollapsed = false;
    }
  }

}
