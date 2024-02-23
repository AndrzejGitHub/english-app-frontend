import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vocabulary} from "../models/vocabulary";

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

  private apiVocabularyUrl = environment.urlApi + "/api/vocabulary";
  private config = { withCredentials: true };
  constructor(private http : HttpClient) { }

  getVocabularies() : Observable<Vocabulary[]> {
    return this.http.get<Vocabulary[]>(`${this.apiVocabularyUrl}` ,{...this.config});
  }


  delVocabulary(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiVocabularyUrl}/${id}` ,{...this.config});
  }

  addVocabulary(vocabulary: Vocabulary): Observable<Vocabulary> {
    return this.http.post<Vocabulary>(`${this.apiVocabularyUrl}` ,vocabulary,{...this.config});
  }

  editVocabulary(vocabulary: Vocabulary): Observable<Vocabulary> {
    return this.http.put<Vocabulary>(`${this.apiVocabularyUrl}/${vocabulary.id}`, vocabulary, {...this.config})
  }

}
