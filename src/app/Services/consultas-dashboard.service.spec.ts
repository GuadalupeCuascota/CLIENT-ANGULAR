import { TestBed } from '@angular/core/testing';

import { ConsultasDashboardService } from './consultas-dashboard.service';

describe('ConsultasDashboardService', () => {
  let service: ConsultasDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultasDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
