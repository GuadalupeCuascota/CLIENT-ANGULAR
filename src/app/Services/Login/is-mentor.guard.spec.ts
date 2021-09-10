import { TestBed } from '@angular/core/testing';

import { IsMentorGuard } from './is-mentor.guard';

describe('IsMentorGuard', () => {
  let guard: IsMentorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsMentorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
