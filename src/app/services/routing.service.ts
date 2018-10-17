import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AsanaDataService } from './asana-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class RoutingService implements Resolve<any> {

  constructor(private spinnerService: Ng4LoadingSpinnerService, private asanaService: AsanaDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const project_id  = route.url;
    // TODO: ADD check if url length is less than 1
    this.asanaService.retrieveProjectData(project_id);
    this.spinnerService.hide();
  }
}
