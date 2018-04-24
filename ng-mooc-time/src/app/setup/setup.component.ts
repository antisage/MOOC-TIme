import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { MooctimeService } from '../mooctime.service';
import { Course } from '../course';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  startDate: NgbDateStruct;
  endDate;

  constructor(
    private mooctimeService: MooctimeService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  finish(course): void {
    console.log(course);
    this.spinnerService.hide();
    this.router.navigateByUrl('/work_form?id=' + course.id); 
  }

  add(name: string, courseCode: string, courseUrl: string): void {
    this.spinnerService.show();
    name = name.trim();
    if (!name) { return; }
    courseCode = courseCode.trim();
    courseUrl = courseUrl.trim();
    const course = {
      name: name,
      course_code: courseCode,
      start_date: new Date(this.startDate.year, this.startDate.month + 1, this.startDate.day),
      end_date: new Date(this.endDate.year, this.endDate.month + 1, this.endDate.day),
      calendar_url: courseUrl
    }

    this.mooctimeService.addCourse(course as Course)
      .subscribe(course => this.finish(course));
  }

}
