import { TestBed } from '@angular/core/testing';

import { PartOfSpeechService } from './part-of-speech.service';

describe('PartOfSpeechService', () => {
  let service: PartOfSpeechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartOfSpeechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
