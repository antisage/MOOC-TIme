import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Setup2Component } from './setup2.component';

describe('Setup2Component', () => {
  let component: Setup2Component;
  let fixture: ComponentFixture<Setup2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Setup2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Setup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
