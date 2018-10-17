import { AsanaDataService } from './../services/asana-data.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {
  public client_id;
  public entered_project_id;
  public is_authenticated = false;
  constructor(private asanaService: AsanaDataService) { }

  authenticateUser(added_client_id) {
    this.asanaService.authenticateUser(added_client_id, this.entered_project_id);
  }

  getProjectTasks(proj_id) {
    this.asanaService.retrieveProjectData(proj_id);
  }

  ngOnInit() {
    this.asanaService.isUserAuthenticated()
      .subscribe(is_authenticated => {
        this.is_authenticated = is_authenticated;
      });
    this.asanaService.retrieveEnteredProjectID()
      .subscribe(id => {
        this.entered_project_id = id;
      });
  }

}
