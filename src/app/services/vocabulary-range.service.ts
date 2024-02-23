import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VocabularyRange} from "../models/vocabulary-range";
import {Vocabulary} from "../models/vocabulary";

@Injectable({
  providedIn: 'root'
})
export class VocabularyRangeService {

  private apiVocabularyRangeUrl = environment.urlApi + "/api/vocabulary-range";
  private config = { withCredentials: true };

  constructor(private http : HttpClient) { }

  getVocabularyRangeByEnglishWord(searchTerm: string | undefined) : Observable<VocabularyRange> {
    return this.http.get<VocabularyRange>(`${this.apiVocabularyRangeUrl}?query=${searchTerm}` ,{...this.config});
  }

  getMaxVocabularyRange() : Observable<number> {
    return this.http.get<number>(`${this.apiVocabularyRangeUrl}/get-max-vocabulary-range` ,{...this.config});
  }
  mergeUpdatingVocabularyWithSearchingWord(vocabulary : Vocabulary, vocabularyRange : number) : Observable<void> {
    return this.http.post<void>(`${this.apiVocabularyRangeUrl}` , {vocabulary, vocabularyRange}, {...this.config});
  }


}
