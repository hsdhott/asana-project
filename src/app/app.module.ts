import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ProjectInfoComponent } from './project-info/project-info.component';

import { RoutingService } from './services/routing.service';
import { AsanaDataService } from './services/asana-data.service';

const routes: Routes = [
  { path: '', component: ProjectInfoComponent },
  { path: 'home', component: ProjectInfoComponent },
  { path: 'details', component: DetailViewComponent },
  { path: '**',
    component: ProjectInfoComponent,
    resolve: {
      project: RoutingService
    }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DetailViewComponent,
    ProjectInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [ RoutingService, AsanaDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
