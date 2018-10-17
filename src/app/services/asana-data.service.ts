import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';

import { environment } from './../../environments/environment';

interface AsanaData {
  data: Array<any>;
}

@Injectable()
export class AsanaDataService {
  private data;
  private is_authenticated = false;
  private auth_header_data;
  private provided_project_id;
  constructor( private http: HttpClient, private router: Router ) { }

  private getData(project_id: string) {
    if (!this.is_authenticated) {
      this.provided_project_id = project_id;
      this.router.navigate(['/home']);
      return Observable.empty<Response>();
    }
    // 866762898018120 - Client ID
    // 864193548262759 - Project ID
    const request_url = `https://app.asana.com/api/1.0/projects/${project_id}/tasks?opt_expand=memberships`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `${this.auth_header_data.auth_token_type} ${this.auth_header_data.auth_token}`
      })
    };
    return this.http.get<AsanaData>(request_url, httpOptions).pipe(
      map(res => {
        const mapped_res = res.data;
        for (const data_object of mapped_res) {
          const memebership_section = data_object.memberships[0].section.id;
          if (data_object.id === memebership_section) {
            data_object.resource_type = 'section';
          }
        }
        this.data = mapped_res;
        return mapped_res;
      }),
      catchError(this.httpErrors)
    );
  }

  private httpErrors(error:  HttpErrorResponse) {
    if (error.status === 401) {
      console.log('Authentication Failed');
    }
    return ErrorObservable.create(new Error('Something bad happened; please try again later.'));
  }

  addAuthData(token, token_type, project_id?) {
    if (!token || !token_type) { return; }

    this.auth_header_data = {
      auth_token: token,
      auth_token_type: token_type
    };
    this.is_authenticated = true;
    if (!project_id) {
      this.router.navigate(['/']);
      return;
    }
    this.retrieveProjectData(project_id);
  }

  authenticateUser(client_id, project_id?) {
    if (!project_id) { project_id = ''; }
    const url = `https://app.asana.com/-/oauth_authorize?response_type=token&client_id=${client_id}&redirect_uri=${environment.return_domain}&state=${project_id}`;
    window.location.href = url;
  }

  isUserAuthenticated() {
    return Observable.of(this.is_authenticated);
  }

  retrieveProjectData(project_id?) {
    if (!this.data && !project_id) {
      this.router.navigate(['/']);
      return Observable.empty<Response>();
    }
    if (!this.data) {
      this.getData(project_id)
        .subscribe(res => {
          this.router.navigate(['/details']);
        });
    } else {
      return Observable.of(this.data);
    }
  }

  retrieveEnteredProjectID() {
    return Observable.of(this.provided_project_id);
  }
}
