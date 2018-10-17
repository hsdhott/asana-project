import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { AsanaDataService } from './services/asana-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private route: ActivatedRoute,
    private asanaService: AsanaDataService) {

  }
  ngOnInit() {
    // this.spinnerService.show();
    this.route.fragment
      .subscribe((fragment: string) => {
        if (!fragment) { return; }
        const string_fragment = new URLSearchParams(fragment);
        const auth_token = string_fragment.get('access_token');
        const auth_token_type = string_fragment.get('token_type');
        const project_id = string_fragment.get('state');
        this.asanaService.addAuthData(auth_token, auth_token_type, project_id);
      });
  }
}
