import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Work } from '../work';
import { MooctimeService } from '../mooctime.service';

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.css']
})
export class WorkFormComponent implements OnInit {

  activeFormIndex: number;
  possibleWork: Work[];
  addingWorkItem = {}
  id: number;
  lastAdded: Work;

  workTypes = ['assignment', 'quiz', 'test', 'other'];

  constructor(
    private mooctimeService: MooctimeService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
  });
  }

  ngOnInit() {
    this.getPossibleWork();
  }

  getPossibleWork(): void {
    this.mooctimeService.getPossibleEvents(this.id)
      .subscribe(work => { this.possibleWork = work; console.log(work)})
  }

  showForm(event, index: number) {
    const work = this.possibleWork[index];
    this.activeFormIndex = index;
    this.addingWorkItem[index] = {
      name: work.name,
      course: this.id,
      work_type: '',
      estimated_time: 1,
      description: work.description,
      url: work.url,
      duedate: new Date(work.duedate)
    }
  }

  addWork(event, index: number) {
    this.lastAdded = this.addingWorkItem[index];
    this.possibleWork.splice(index, 1);
    window.scrollTo(0,0);
    this.activeFormIndex = null;
    this.mooctimeService.addWork(this.lastAdded as Work).subscribe();
  }

  finished() {
    this.router.navigate(['work-list', this.id])
  }
}
