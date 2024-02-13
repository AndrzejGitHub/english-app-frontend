import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TranslationDeepL} from "../models/translation-deep-l";

@Injectable({
  providedIn: 'root'
})
export class TranslationDeepLService {


  private apiTranslationUrl = environment.urlApi + "/api/deepl/translate";
  private config = { withCredentials: true };
  constructor(private http : HttpClient) { }

  getTranslationEnglishGBToPolishFromDeepL(translation:String) : Observable<TranslationDeepL> {
    return this.http.get<TranslationDeepL>(`${this.apiTranslationUrl}/en-pl?translation=${translation}` ,{...this.config});
  }
  getTranslationPolishToEnglishGBFromDeepL(translation:String) : Observable<TranslationDeepL> {
    return this.http.get<TranslationDeepL>(`${this.apiTranslationUrl}/pl-en?translation=${translation}` ,{...this.config});
  }

}
