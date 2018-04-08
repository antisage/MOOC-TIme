import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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

  result: Course;

  constructor(private mooctimeService: MooctimeService) { }

  ngOnInit() {
  }

  add(name: string, 
      courseCode: string,
      courseUrl: string): void {
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

    const x = this.mooctimeService.addCourse(course as Course)
      .subscribe(course => {
        this.result = course;
      });
    console.log(x);
  }

}
