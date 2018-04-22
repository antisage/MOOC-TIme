import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
 

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { SetupComponent } from './setup/setup.component';
import { MooctimeService } from './mooctime.service';
import { Setup2Component } from './setup2/setup2.component';
import { SchedulingAssistantComponent } from './scheduling-assistant/scheduling-assistant.component';
import { WorkFormComponent } from './work-form/work-form.component';
import { WorkListComponent } from './work-list/work-list.component';
import { CountdownPipe } from './countdown.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CoursesComponent,
    SetupComponent,
    Setup2Component,
    SchedulingAssistantComponent,
    WorkFormComponent,
    WorkListComponent,
    CountdownPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    MooctimeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
