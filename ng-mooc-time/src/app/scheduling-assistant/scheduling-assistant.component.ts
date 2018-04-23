import { Component, OnInit, Input } from '@angular/core';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Work } from '../work';
import { Session } from '../session';
import { MooctimeService } from '../mooctime.service';

@Component({
  selector: 'app-scheduling-assistant',
  templateUrl: './scheduling-assistant.component.html',
  styleUrls: ['./scheduling-assistant.component.css']
})
export class SchedulingAssistantComponent implements OnInit {

  @Input() workId: number; 
  start: NgbDateStruct;
  time = {hour: 13, minute: 30};
  meridian = true;
  scheduledHours = 0;

  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  constructor(private moocService:MooctimeService) { }

  ngOnInit() {
  }

  addSession(duration: string) {
    const session: Session = {
      work: this.workId,
      start: new Date(this.start.year, this.start.month-1, this.start.day, this.time.hour, this.time.minute),
      end: new Date(this.start.year, this.start.month-1, this.start.day, this.time.hour + parseInt(duration), this.time.minute)
    }
    this.moocService.addSession(session).subscribe();
    this.scheduledHours += parseInt(duration);
  }

}
