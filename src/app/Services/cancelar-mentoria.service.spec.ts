import { TestBed } from '@angular/core/testing';

import { CancelarMentoriaService } from './cancelar-mentoria.service';

describe('CancelarMentoriaService', () => {
  let service: CancelarMentoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancelarMentoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
