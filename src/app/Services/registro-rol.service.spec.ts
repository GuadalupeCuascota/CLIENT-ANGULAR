import { TestBed } from '@angular/core/testing';

import { RegistroRolService } from './registro-rol.service';

describe('RegistroRolService', () => {
  let service: RegistroRolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroRolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
