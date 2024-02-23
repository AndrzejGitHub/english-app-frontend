import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Translation} from "../models/translation";
import {TranslationWithVocabularyRange} from "../models/translation-with-vocabulary-range";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private apiTranslationUrl = environment.urlApi + "/api/translation";
  private config = { withCredentials: true };
  constructor(private http : HttpClient) { }

  getTranslations() : Observable<Translation[]> {
    return this.http.get<Translation[]>(`${this.apiTranslationUrl}` ,{...this.config});
  }

  getTranslationsWithVocabularyRange() : Observable<TranslationWithVocabularyRange[]> {
    return this.http.get<TranslationWithVocabularyRange[]>(`${this.apiTranslationUrl}/range` ,{...this.config});
  }

  getTranslation(id: number) : Observable<Translation[]> {
    return this.http.get<Translation[]>(`${this.apiTranslationUrl}/${id}` ,{...this.config});
  }


  addTranslation(translation: Translation): Observable<Translation> {
    return this.http.post<Translation>(`${this.apiTranslationUrl}` ,translation,{...this.config});
  }

  addTranslationWithVocabularyRange(translationWithVocabularyRange: TranslationWithVocabularyRange): Observable<TranslationWithVocabularyRange> {
    return this.http.post<TranslationWithVocabularyRange>(`${this.apiTranslationUrl}/range` ,translationWithVocabularyRange,{...this.config});
  }
  editTranslation(translation: Translation): Observable<Translation> {
    return this.http.put<Translation>(`${this.apiTranslationUrl}/${translation.id}` ,translation,{...this.config});
  }

  editTranslationWithVocabularyRange(translationWithVocabularyRange: TranslationWithVocabularyRange): Observable<TranslationWithVocabularyRange> {
    return this.http.put<TranslationWithVocabularyRange>(`${this.apiTranslationUrl}/range/${translationWithVocabularyRange.translation.id}` ,translationWithVocabularyRange,{...this.config});
  }
  delTranslation(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiTranslationUrl}/${id}` ,{...this.config});
  }

}
