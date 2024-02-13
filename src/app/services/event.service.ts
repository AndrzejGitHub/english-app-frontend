import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {User} from "../models/user";
import {Vocabulary} from "../models/vocabulary";
import {Translation} from "../models/translation";
import {TranslationWithVocabularyRange} from "../models/translation-with-vocabulary-range";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private userUpdate = new Subject<User>();
  private userInsert = new Subject<User>();
  private userRemoval = new Subject<number>();
  private userLogin = new Subject<void>();
  private userLogout = new Subject<void>();

  userUpdate$ = this.userUpdate.asObservable();
  userInsert$ = this.userInsert.asObservable();
  userRemoval$ = this.userRemoval.asObservable();
  userLogin$ = this.userLogin.asObservable();
  userLogout$ = this.userLogout.asObservable();

  private vocabularyUpdate = new Subject<Vocabulary>();
  private vocabularyInsert = new Subject<Vocabulary>();
  private vocabularyRemoval = new Subject<number>();
  vocabularyUpdate$ = this.vocabularyUpdate.asObservable();
  vocabularyInsert$ = this.vocabularyInsert.asObservable();
  vocabularyRemoval$ = this.vocabularyRemoval.asObservable();


  private translationUpdate = new Subject<Translation>();
  private translationInsert = new Subject<Translation>();
  private translationRemoval = new Subject<number>();
  translationUpdate$ = this.translationUpdate.asObservable();
  translationInsert$ = this.translationInsert.asObservable();
  translationRemoval$ = this.translationRemoval.asObservable();

  private translationWithVocabularyRangeUpdate = new Subject<TranslationWithVocabularyRange>();
  private translationWithVocabularyRangeInsert = new Subject<TranslationWithVocabularyRange>();
  private translationWithVocabularyRangeRemoval = new Subject<number>();
  translationWithVocabularyRangeUpdate$ = this.translationWithVocabularyRangeUpdate.asObservable();
  translationWithVocabularyRangeInsert$ = this.translationWithVocabularyRangeInsert.asObservable();
  translationWithVocabularyRangeRemoval$ = this.translationWithVocabularyRangeRemoval.asObservable();
  emitUserRemoval(userId: number) {
    this.userRemoval.next(userId);
  }

  emitUserUpdate(user: User) {
    this.userUpdate.next(user);
  }

  emitUserInsert(user: User) {
    this.userInsert.next(user);
  }

  emitUserLogin() {
    this.userLogin.next();
  }
  emitUserLogout() {
    this.userLogout.next();
  }
  emitVocabularyUpdate(vocabulary: Vocabulary) {
  }

  emitVocabularyInsert(vocabulary: Vocabulary) {
  }

  emitTranslationRemoval(translationId: number) {
    this.translationRemoval.next(translationId);
  }

  emitTranslationUpdate(translation: Translation) {
    this.translationUpdate.next(translation);
  }

  emitTranslationInsert(translation: Translation) {
    this.translationInsert.next(translation);
  }

  emitTranslationWithVocabularyRangeRemoval(translationWithVocabularyRangeId: number) {
    this.translationWithVocabularyRangeRemoval.next(translationWithVocabularyRangeId);
  }

  emitTranslationWithVocabularyRangeUpdate(translationWithVocabularyRange: TranslationWithVocabularyRange) {
    this.translationWithVocabularyRangeUpdate.next(translationWithVocabularyRange);
  }

  emitTranslationWithVocabularyRangeInsert(translationWithVocabularyRange: TranslationWithVocabularyRange) {
    this.translationWithVocabularyRangeInsert.next(translationWithVocabularyRange);
  }
}
