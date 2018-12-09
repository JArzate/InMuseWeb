import { TestBed } from '@angular/core/testing';

import { EstadisticaService } from './estadistica.service';

describe('EstadisticaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadisticaService = TestBed.get(EstadisticaService);
    expect(service).toBeTruthy();
  });
});
