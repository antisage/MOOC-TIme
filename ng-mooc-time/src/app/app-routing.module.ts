import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { SetupComponent } from './setup/setup.component';
import { WorkFormComponent } from './work-form/work-form.component';
import { WorkListComponent } from './work-list/work-list.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'work_form', component: WorkFormComponent },
  { path: 'work-list/:id', component: WorkListComponent },
  { path: 'work-list', component: WorkListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}