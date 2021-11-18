import { TestBed } from '@angular/core/testing';

import { RegistroSolicitudMentoriasService } from './registro-solicitud-mentorias.service';

describe('RegistroSolicitudMentoriasService', () => {
  let service: RegistroSolicitudMentoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroSolicitudMentoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
