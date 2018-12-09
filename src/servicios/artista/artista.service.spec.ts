import { TestBed } from '@angular/core/testing';

import { ArtistaService } from './artista.service';

describe('ArtistaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistaService = TestBed.get(ArtistaService);
    expect(service).toBeTruthy();
  });
});
