import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Work } from '../work';
import { MooctimeService } from '../mooctime.service';

@Component({
  selector: 'app-setup2',
  templateUrl: './setup2.component.html',
  styleUrls: ['./setup2.component.css']
})
export class Setup2Component implements OnInit {

  possibleWork: Work[];
  id: number;

  constructor(
    private mooctimeService: MooctimeService,
    private route: ActivatedRoute
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
      .subscribe(work => { this.possibleWork = work; console.log(work);})
  }
}
