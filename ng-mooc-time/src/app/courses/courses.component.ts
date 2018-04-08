import { Component, OnInit } from '@angular/core';

import { Course } from '../course';
import { MooctimeService } from '../mooctime.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[];

  constructor(private mooctimeService: MooctimeService) { }

  ngOnInit() {
    // this.http.get('http://localhost:8000/api/courses/')
    //   .subscribe(data => this.courses = data);
    this.getCourses();
  }

  getCourses(): void {
    this.mooctimeService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

}
