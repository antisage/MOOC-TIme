import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Course } from './course';
import { Work } from './work';
import { Session } from './session';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MooctimeService {

  private apiBaseUrl = 'http://localhost:8000/api/';
  private coursesUrl = 'courses/';
  private workUrl = 'works/';
  private sessionUrl = 'interval-sessions/';

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

  getPossibleEvents(courseId: number): Observable<Work[]> {
    return this.http.get<Work[]>(this.apiBaseUrl + 'course/calendar-events/' + courseId + '/')
  }

  getWork(): Observable<Work[]> {
    return this.http.get<Work[]>(this.apiBaseUrl + this.workUrl);
  }

  addWork(work: Work): Observable<Work> {
    const serialWork = {
      name: work.name,
      course: work.course,
      work_type: work.work_type,
      estimated_time: work.estimated_time,
      description: work.description,
      url: work.url,
      due_date: work.duedate.toISOString().split('T')[0]
    }
    return this.http.post<Work>(this.apiBaseUrl + this.workUrl, serialWork, httpOptions);
  }

  getWorkList(courseId: Number): Observable<Work[]> {
    return this.http.get<Work[]>(this.apiBaseUrl + this.workUrl + '?course_id=' + courseId);
  }

  addSession(session: Session): Observable<Session> {
    const serialSession = {
      work: session.work,
      start: session.start.toISOString(),
      end: session.end.toISOString()
    }
    return this.http.post<Session>(this.apiBaseUrl + this.sessionUrl, serialSession, httpOptions);
  }

  getCalendar(courseId: number): string {
    return this.apiBaseUrl + 'generate-calendar/?course_id=' + courseId;
  }

}
