import { TestBed } from '@angular/core/testing';

import { TranslationDeepLService } from './translation-deep-l.service';

describe('TranslationDeepLService', () => {
  let service: TranslationDeepLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationDeepLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
