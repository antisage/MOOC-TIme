import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { SetupComponent } from './setup/setup.component';
import { MooctimeService } from './mooctime.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CoursesComponent,
    SetupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [
    MooctimeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
