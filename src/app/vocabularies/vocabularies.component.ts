import {Component, OnInit} from '@angular/core';
import {EventService} from "../services/event.service";
import {BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {Vocabulary} from "../models/vocabulary";
import {VocabularySearchService} from "../services/vocabulary.search.service";
import {Translation} from "../models/translation";
import {VocabularyModalComponent} from "./vocabulary/vocabulary-modal/vocabulary-modal.component";
import {catchError, switchMap} from "rxjs";
import {TranslationService} from "../services/translation.service";
import {VocabularyRange} from "../models/vocabulary-range";
import {TranslationWithVocabularyRange} from "../models/translation-with-vocabulary-range";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-vocabularies',
  templateUrl: './vocabularies.component.html',
  styleUrl: './vocabularies.component.scss'
})
export class VocabulariesComponent implements OnInit {

  vocabularies: Vocabulary[] | undefined
  translations: Translation[] | undefined
  vocabularyRange: VocabularyRange | undefined;
  translationsWithVocabularyRange: TranslationWithVocabularyRange[] | undefined;
  searchTerm: string | undefined;
  selectedVocabularyRangeId: number | undefined;
  errorMessage: string | undefined;

  constructor(
    private modalService: BsModalService,
    private eventService: EventService,
    private vocabularySearchService: VocabularySearchService,
    private translationService: TranslationService,
    public userService: UserService) {
  }

  ngOnInit(): void {
    this.subscribeToTranslationRemovalEvent();
  }

  onManageVocabulary(translationWithVocabularyRange: TranslationWithVocabularyRange) {
    const initialState = {
      translation: translationWithVocabularyRange.translation,
      vocabulary: translationWithVocabularyRange.translation.vocabulary,
      vocabularyRange: translationWithVocabularyRange.vocabularyRange,
      translationWithVocabularyRange: translationWithVocabularyRange,
      onRemoveVocabularyClick: this.onRemoveVocabularyClick.bind(this)
    };
    this.modalService.show(VocabularyModalComponent, {initialState});
  }

  openModalAddEnglishWord() {
    const config: ModalOptions = {
      initialState: {},
    };
    this.modalService.show(VocabularyModalComponent, config);
  }

  onRemoveVocabularyClick(translationId: number): void {
    this.eventService.emitTranslationRemoval(translationId);

  }

  private subscribeToTranslationRemovalEvent(): void {
    this.eventService.translationRemoval$
      .pipe(switchMap((translationId) =>
        translationId ? this.translationService.delTranslation(translationId) : "null")
      )
      .subscribe(
        {
          next: () => {
            this.searchTerm = '';
            this.translationsWithVocabularyRange = [];
            this.translations = [];
            this.vocabularyRange = undefined;
            this.selectedVocabularyRangeId = undefined;
          },
          error: (error) => {
            this.errorMessage = error;
          }
        }
      );
  }

  searchVocabulary() {
    if (this.searchTerm) {
      const cleanedSearchTerm = this.searchTerm.replace(/\s+/g, ' ');
      this.vocabularySearchService.searchVocabulariesByRangeWithVocabularyRange(cleanedSearchTerm)
        .pipe(
          catchError((error) => {
            if (error.status === 404) {
              this.errorMessage = `The english word "${cleanedSearchTerm}" was not found.`;
              return this.translationsWithVocabularyRange = [];
            } else {
              this.errorMessage = error;
              throw error;
            }
          })
        )
        .subscribe((translationsWithVocabularyRange) => {
          this.translationsWithVocabularyRange = translationsWithVocabularyRange;
          this.translations = translationsWithVocabularyRange.map(item => item.translation);
          this.vocabularyRange = translationsWithVocabularyRange.map(item => item.vocabularyRange)[0];
          this.selectedVocabularyRangeId ? this.vocabularyRange.vocabulary_range : null;
        });
    }
  }

  shouldDisplayTranslation(translate: Translation, index: number): boolean {
    if (index === 0) {
      return true;
    }
    const currentWord = translate.vocabulary.englishWord;
    const previousWord = this.translations && this.translations[index - 1]?.vocabulary.englishWord;
    return currentWord !== previousWord;
  }

  getPolishMeaningNumber(index: number): number {
    if (index === 0 || !this.translations || index >= this.translations.length) {
      return 1;
    }
    const currentWord = this.translations[index].vocabulary.englishWord;
    const previousWord = this.translations[index - 1]?.vocabulary.englishWord;
    return currentWord !== previousWord ? 1 : this.getPolishMeaningCount(index - 1, currentWord) + 1;
  }

  getPolishMeaningCount(endIndex: number, word: string): number {
    let count = 0;
    for (let i = endIndex; i >= 0; i--) {
      // @ts-ignore
      const currentTranslation = this.translations[i]?.vocabulary;
      if (!currentTranslation || currentTranslation.englishWord !== word) {
        break;
      }
      count++;
    }
    return count;
  }

}
