import { Component, OnInit } from '@angular/core';

import { AsanaDataService } from './../services/asana-data.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  public response_data;
  constructor( private asanaService: AsanaDataService) { }

  ngOnInit() {
    this.asanaService.retrieveProjectData()
      .subscribe(res => {
        this.response_data = res;
      });
  }

}
