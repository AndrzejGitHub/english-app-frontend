import { Component } from '@angular/core';
import {TranslationDeepLService} from "../../services/translation-deep-l.service";
import {TranslationDeepL} from "../../models/translation-deep-l";
import {Observable} from "rxjs";

@Component({
  selector: 'app-translation-deep-l',
  templateUrl: './translation-deep-l.component.html',
  styleUrl: './translation-deep-l.component.scss'
})
export class TranslationDeepLComponent {
  translation: string = '';
  translatedText: string = '';
  isEnglishToPolish: boolean = true;

  constructor(private translationDeepLService: TranslationDeepLService) {}

  translateText() {
    if (this.translation.trim() === '') {
      this.translatedText = '';
      return;
    }
    let translationObservable: Observable<TranslationDeepL>;
    if (this.isEnglishToPolish) {
      translationObservable = this.translationDeepLService.getTranslationEnglishGBToPolishFromDeepL(this.translation);
    } else {
      translationObservable = this.translationDeepLService.getTranslationPolishToEnglishGBFromDeepL(this.translation);
    }

    translationObservable.subscribe({
      next: (translation: TranslationDeepL) => {
        this.translatedText = translation.text;
      },
      error: (err) => {
        console.error('Error while translating: ', err);
        this.translatedText = 'Translation Error';
      }
    });

  }

  swapTranslations() {
    this.isEnglishToPolish = !this.isEnglishToPolish;
    const tempText = this.translation;
    this.translation = this.translatedText;
    this.translatedText = tempText;
  }
}
