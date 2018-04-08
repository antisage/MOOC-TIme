import { TestBed, inject } from '@angular/core/testing';

import { MooctimeService } from './mooctime.service';

describe('MooctimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MooctimeService]
    });
  });

  it('should be created', inject([MooctimeService], (service: MooctimeService) => {
    expect(service).toBeTruthy();
  }));
});
