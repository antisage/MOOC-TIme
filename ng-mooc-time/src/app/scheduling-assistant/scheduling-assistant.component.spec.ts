import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingAssistantComponent } from './scheduling-assistant.component';

describe('SchedulingAssistantComponent', () => {
  let component: SchedulingAssistantComponent;
  let fixture: ComponentFixture<SchedulingAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
