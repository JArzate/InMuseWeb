import { TestBed } from '@angular/core/testing';

import { RecorridoService } from './recorrido.service';

describe('RecorridoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecorridoService = TestBed.get(RecorridoService);
    expect(service).toBeTruthy();
  });
});
