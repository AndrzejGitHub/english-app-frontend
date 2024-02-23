import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Vocabulary} from "../models/vocabulary";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment/environment";
import {Translation} from "../models/translation";
import {TranslationWithVocabularyRange} from "../models/translation-with-vocabulary-range";

@Injectable({
  providedIn: 'root'
})
export class VocabularySearchService {

  private apiVocabularyUrl = environment.urlApi + "/api/vocabulary/search";
  private config = {withCredentials: true};

  constructor(private http: HttpClient) {
  }


  searchVocabulariesStartingWith(searchTerm: string): Observable<Vocabulary[]> {
    return this.http.get<Vocabulary[]>(`${this.apiVocabularyUrl}/startingWith?query=${searchTerm}`, {...this.config});
  }

  searchVocabulary(searchTerm: string): Observable<Vocabulary[]> {
    return this.http.get<Vocabulary[]>(`${this.apiVocabularyUrl}?query=${searchTerm}`, {...this.config});
  }

  searchTranslationByVocabularyOrderByPartOfSpeech(searchTerm: string): Observable<Translation[]> {
    return this.http.get<Translation[]>(`${this.apiVocabularyUrl}/translation?query=${searchTerm}`, {...this.config});
  }


  searchVocabularyByRange(searchTerm: string): Observable<Translation[]> {
    return this.http.get<Translation[]>(`${this.apiVocabularyUrl}/findByRange?query=${searchTerm}`, {...this.config});
  }

  searchVocabulariesByRangeWithVocabularyRange(searchTerm: string): Observable<TranslationWithVocabularyRange[]> {
    return this.http.get<TranslationWithVocabularyRange[]>(`${this.apiVocabularyUrl}/findByRangeWithVocabularyRange?query=${searchTerm}`, {...this.config});
  }
}
