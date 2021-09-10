import { TestBed } from '@angular/core/testing';

import { RegistroMateriasService } from './registro-materias.service';

describe('RegistroMateriasService', () => {
  let service: RegistroMateriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroMateriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
