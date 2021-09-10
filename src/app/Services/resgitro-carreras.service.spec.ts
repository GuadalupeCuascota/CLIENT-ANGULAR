import { TestBed } from '@angular/core/testing';

import { ResgitroCarrerasService } from './resgitro-carreras.service';

describe('ResgitroCarrerasService', () => {
  let service: ResgitroCarrerasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResgitroCarrerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
