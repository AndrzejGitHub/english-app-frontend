import { TestBed } from '@angular/core/testing';

import { VocabularySearchService } from './vocabulary.search.service';

describe('VocabularySearchService', () => {
  let service: VocabularySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocabularySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
