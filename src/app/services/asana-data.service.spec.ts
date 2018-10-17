import { TestBed, inject } from '@angular/core/testing';

import { AsanaDataService } from './asana-data.service';

describe('AsanaDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsanaDataService]
    });
  });

  it('should be created', inject([AsanaDataService], (service: AsanaDataService) => {
    expect(service).toBeTruthy();
  }));
});
