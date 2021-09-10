import { TestBed } from '@angular/core/testing';

import { RegistroArchivoService } from './registro-archivo.service';

describe('RegistroArchivoService', () => {
  let service: RegistroArchivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroArchivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
