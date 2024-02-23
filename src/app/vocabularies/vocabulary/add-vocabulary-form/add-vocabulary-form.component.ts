import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Vocabulary} from "../../../models/vocabulary";
import {Translation} from "../../../models/translation";
import {TranslationService} from "../../../services/translation.service";
import {PartOfSpeech} from "../../../models/part-of-speech";
import {PartOfSpeechService} from "../../../services/part-of-speech.service";
import {TranslationWithVocabularyRange} from "../../../models/translation-with-vocabulary-range";
import {VocabularyRange} from "../../../models/vocabulary-range";
import {HttpErrorResponse} from "@angular/common/http";
import {VocabularySearchService} from "../../../services/vocabulary.search.service";
import {VocabularyRangeService} from "../../../services/vocabulary-range.service";
import {catchError, EMPTY, map, of, switchMap} from "rxjs";

@Component({
  selector: 'app-add-vocabulary-form',
  templateUrl: './add-vocabulary-form.component.html',
  styleUrl: './add-vocabulary-form.component.scss'
})
export class AddVocabularyFormComponent implements OnInit {

  @Input() vocabulary?: Vocabulary;
  @Input() translation?: Translation;
  @Input() vocabularyRange?: VocabularyRange;
  @Output() onSubmitClicked: EventEmitter<void> = new EventEmitter<void>();

  errors: string[] = [];
  partOfSpeechOptions: PartOfSpeech[] = [];
  searchErrorMessage: string = '';
  searchSuccessMessage: string = '';

  searchSuccessVocabularyRange: number | undefined;
  mergeVocabularyRange: number | undefined;
  updatingVocabularyVocabularyRange: number | undefined;
  searchSuccessVocabulary: Vocabulary | undefined;
  searchTerm: string | undefined;
  includeVocabularyRange: boolean = false;

  form: TranslationWithVocabularyRange = {
    translation: {
      id: undefined,
      partOfSpeech: {id: undefined, name: ''},
      vocabulary: {
        id: undefined,
        englishWord: '',
        imageURL: '',
      },
      translationVariant: {id: undefined, polishMeaning: ''},
    },
    vocabularyRange: {
      id: undefined,
      vocabulary_range: undefined,
      vocabulary: {
        id: undefined,
        englishWord: '',
        imageURL: '',
      },
    },
  };

  constructor(private translationService: TranslationService,
              private bsModalRef: BsModalRef,
              private partOfSpeechService: PartOfSpeechService,
              private vocabularySearchService: VocabularySearchService,
              private vocabularyRangeService: VocabularyRangeService) {
  }

  ngOnInit(): void {
    this.partOfSpeechService.getPartOfSpeech().subscribe(
      {
        next: getPartOfSpeeches => {
          this.partOfSpeechOptions = getPartOfSpeeches
          if (this.translation) {
            this.form.translation.id = this.translation.id;
            this.form.translation.vocabulary.id = this.translation.vocabulary.id;
            this.form.translation.vocabulary.englishWord = this.translation.vocabulary.englishWord;
            this.form.translation.vocabulary.imageURL = this.translation.vocabulary.imageURL;
            this.form.vocabularyRange.id = this.vocabularyRange?.id;
            this.form.vocabularyRange.vocabulary_range = this.vocabularyRange?.vocabulary_range;
            this.form.vocabularyRange.vocabulary.id = this.translation.vocabulary.id;
            this.form.vocabularyRange.vocabulary.englishWord = this.translation.vocabulary.englishWord;
            this.form.vocabularyRange.vocabulary.imageURL = this.translation.vocabulary.imageURL;
            this.form.translation.partOfSpeech = this.translation.partOfSpeech;
            this.form.translation.translationVariant.id = this.translation.translationVariant.id;
            this.form.translation.translationVariant.polishMeaning = this.translation.translationVariant.polishMeaning;
          }
        }
      }
    )
  }

  onSubmit(): void {
    this.errors = [];
    if ((this.includeVocabularyRange) && (!this.updatingVocabularyVocabularyRange)) {
      this.form.vocabularyRange.vocabulary_range = this.mergeVocabularyRange;
    }

    const translationServiceMethod = this.form.translation.id
      ? this.translationService.editTranslationWithVocabularyRange(this.form)
      : this.translationService.addTranslationWithVocabularyRange(this.form)
    translationServiceMethod.subscribe({
        next: () => {
          this.resetForm();
          this.bsModalRef.hide();
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.messages) {
            this.errors = errorResponse.error.messages[0].trim().split(';');
          } else {
            this.errors = ['An unexpected error occurred. Please try again.'];
          }
        }
      }
    )
    if (this.includeVocabularyRange) {
      this.vocabularyRangeService.mergeUpdatingVocabularyWithSearchingWord(this.searchSuccessVocabulary!, this.mergeVocabularyRange!)
        .subscribe({
            next: () => {
              // TODO mergeUpdatingVocabularyWithSearchingWord success
            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.messages) {
                this.errors = errorResponse.error.messages[0].trim().split(';');
              } else {
                this.errors = ['An unexpected error occurred. Please try again.'];
              }
            }
          }
        )
    }
  }

  resetForm(): void {
    this.form = {
      translation: {
        id: undefined,
        partOfSpeech: {id: undefined, name: ''},
        vocabulary: {
          id: undefined,
          englishWord: '',
          imageURL: '',
        },
        translationVariant: {id: undefined, polishMeaning: ''},
      },
      vocabularyRange: {
        id: undefined,
        vocabulary_range: undefined,
        vocabulary: {
          id: undefined,
          englishWord: '',
          imageURL: '',
        },
      },
    };
  }

  searchVocabulary() {
    if (this.searchTerm) {
      const cleanedSearchTerm = this.searchTerm.replace(/\s+/g, ' ');
      this.vocabularySearchService.searchVocabulary(cleanedSearchTerm)
        .pipe(
          switchMap((results) => {
            if (results && results.length > 0) {
              this.searchErrorMessage = '';
              this.searchSuccessMessage = this.searchTerm!;
              const resultOfSearchingVocabulary = results[0];
              this.searchSuccessVocabulary = resultOfSearchingVocabulary;
              this.searchSuccessMessage = resultOfSearchingVocabulary.englishWord;
              if (this.vocabularyRange) {
                this.updatingVocabularyVocabularyRange = this.vocabularyRange.vocabulary_range;
              } else {
                this.updatingVocabularyVocabularyRange = undefined;
              }
              return this.vocabularyRangeService.getVocabularyRangeByEnglishWord(cleanedSearchTerm)
                .pipe(
                  map((vr) => {
                    this.searchSuccessVocabularyRange = vr.vocabulary_range;
                    return null;
                  }),
                  catchError(err => {
                    this.searchSuccessVocabularyRange = undefined;
                    return of(null);
                  })
                );
            } else {
              this.searchErrorMessage = this.searchTerm!;
              this.searchSuccessMessage = '';
              return of(null);
            }
          }),
          switchMap(() => {
            if (this.updatingVocabularyVocabularyRange) {
              return of(this.updatingVocabularyVocabularyRange);
            } else {
              if (this.searchSuccessVocabularyRange) {
                return of(this.searchSuccessVocabularyRange);
              } else {
                return this.vocabularyRangeService.getMaxVocabularyRange().pipe(
                  catchError(err => {
                    this.errors = ['An unexpected error occurred. Please try again.'];
                    return EMPTY;
                  })
                );
              }
            }
          })
        )
        .subscribe((value) => {
          this.mergeVocabularyRange = value;
        });
    }
  }

  onIncludeVocabularyRangeChange(event: any) {
    this.includeVocabularyRange = event.target.checked
  }

}
