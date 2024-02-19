import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {EventService} from "../../../services/event.service";
import {Vocabulary} from "../../../models/vocabulary";
import {Translation} from "../../../models/translation";
import {TranslationService} from "../../../services/translation.service";
import {PartOfSpeech} from "../../../models/part-of-speech";
import {PartOfSpeechService} from "../../../services/part-of-speech.service";
import {TranslationWithVocabularyRange} from "../../../models/translation-with-vocabulary-range";
import {VocabularyRange} from "../../../models/vocabulary-range";
import {HttpErrorResponse} from "@angular/common/http";


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


  partOfSpeechOptions: PartOfSpeech[] = [];

  constructor(
    private translationService: TranslationService,
    private bsModalRef: BsModalRef,
    private eventService: EventService,
    private partOfSpeechService: PartOfSpeechService
  ) {
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
    const translationServiceMethod = this.form.translation.id
      ? this.translationService.editTranslationWithVocabularyRange(this.form)
      : this.translationService.addTranslationWithVocabularyRange(this.form)

    translationServiceMethod.subscribe(
      {
        next: (translation) => {
          if (this.form.translation.id) {
            this.eventService.emitTranslationWithVocabularyRangeUpdate(translation);
          } else {
            this.eventService.emitTranslationWithVocabularyRangeInsert(translation);
          }
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

}
