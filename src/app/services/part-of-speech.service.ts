import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PartOfSpeech} from "../models/part-of-speech";

@Injectable({
  providedIn: 'root'
})
export class PartOfSpeechService {
  private apiPartOfSpeechUrl = environment.urlApi + "/api/part-of-speech";
  private config = { withCredentials: true };
  constructor(private http : HttpClient) { }

  getPartOfSpeech() : Observable<PartOfSpeech[]> {
    return this.http.get<PartOfSpeech[]>(`${this.apiPartOfSpeechUrl}` ,{...this.config});
  }
}
