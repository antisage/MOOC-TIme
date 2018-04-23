import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Work } from '../work';
import { MooctimeService } from '../mooctime.service';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {
  courseId: number;
  work: Work[];
  editing: number;
  downloadUrl: string;
  showCalendar: boolean;

  constructor(
    private mooctimeService: MooctimeService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.queryParams.subscribe(params => {
      this.courseId = +this.route.snapshot.paramMap.get('id');
  });
  }

  ngOnInit() {
    this.downloadUrl = this.mooctimeService.getCalendar(this.courseId);
    this.mooctimeService.getWorkList(this.courseId)
      .subscribe(work => this.work = work);
  }

  click(event, workId) {
    this.editing = workId;
  }

  showCalendarUrl() {
    this.showCalendar = true;
  }

}
