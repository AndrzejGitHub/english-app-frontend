import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VocabularyRange} from "../models/vocabulary-range";

@Injectable({
  providedIn: 'root'
})
export class VocabularyRangeService {

  private apiVocabularyRangeUrl = environment.urlApi + "/api/vocabulary-range";
  private config = { withCredentials: true };
  constructor(private http : HttpClient) { }

  getVocabularyRangByTranslationId(id: number | undefined) : Observable<VocabularyRange> {
    return this.http.get<VocabularyRange>(`${this.apiVocabularyRangeUrl}/${id}` ,{...this.config});
  }
}
