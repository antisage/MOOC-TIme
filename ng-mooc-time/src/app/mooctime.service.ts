import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Course } from './course';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MooctimeService {

  private apiBaseUrl = 'http://localhost:8000/api/'
  private coursesUrl = 'courses/'

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiBaseUrl + this.coursesUrl)
  }

  addCourse(course: Course): Observable<Course> {
    const serialCourse = {
      name: course.name,
      course_code: course.course_code,
      start_date: course.start_date.toISOString().split('T')[0],
      end_date: course.end_date.toISOString().split('T')[0],
      calendar_url: course.calendar_url
    }
    return this.http.post<Course>(this.apiBaseUrl + this.coursesUrl, serialCourse, httpOptions)
  }
}
