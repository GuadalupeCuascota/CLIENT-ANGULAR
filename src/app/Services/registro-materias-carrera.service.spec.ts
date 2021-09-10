import { TestBed } from '@angular/core/testing';

import { RegistroMateriasCarreraService } from './registro-materias-carrera.service';

describe('RegistroMateriasCarreraService', () => {
  let service: RegistroMateriasCarreraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroMateriasCarreraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
