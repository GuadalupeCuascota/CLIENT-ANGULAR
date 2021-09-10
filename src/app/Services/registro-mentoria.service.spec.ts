import { TestBed } from '@angular/core/testing';

import { RegistroMentoriaService } from './registro-mentoria.service';

describe('RegistroMentoriaService', () => {
  let service: RegistroMentoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroMentoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
