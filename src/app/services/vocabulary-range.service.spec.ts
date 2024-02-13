import { TestBed } from '@angular/core/testing';

import { VocabularyRangeService } from './vocabulary-range.service';

describe('VocabularyRangeService', () => {
  let service: VocabularyRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocabularyRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
