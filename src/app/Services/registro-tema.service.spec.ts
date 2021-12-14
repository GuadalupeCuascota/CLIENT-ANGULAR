import { TestBed } from '@angular/core/testing';

import { RegistroTemaService } from './registro-tema.service';

describe('RegistroTemaService', () => {
  let service: RegistroTemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroTemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
