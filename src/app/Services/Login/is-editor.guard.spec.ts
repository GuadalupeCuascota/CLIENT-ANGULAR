import { TestBed } from '@angular/core/testing';

import { IsEditorGuard } from './is-editor.guard';

describe('IsEditorGuard', () => {
  let guard: IsEditorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsEditorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
