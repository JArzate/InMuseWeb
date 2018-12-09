import { TestBed } from '@angular/core/testing';

import { MuseoServiveService } from './museo-servive.service';

describe('MuseoServiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MuseoServiveService = TestBed.get(MuseoServiveService);
    expect(service).toBeTruthy();
  });
});
