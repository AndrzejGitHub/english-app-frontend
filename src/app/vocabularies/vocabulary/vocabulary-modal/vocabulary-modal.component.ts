import {Component, Input, ViewChild} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Vocabulary} from "../../../models/vocabulary";
import {AddVocabularyFormComponent} from "../add-vocabulary-form/add-vocabulary-form.component";
import {Translation} from "../../../models/translation";
import {VocabularyRange} from "../../../models/vocabulary-range";
import {TranslationWithVocabularyRange} from "../../../models/translation-with-vocabulary-range";

@Component({
  selector: 'app-vocabulary-modal',
  templateUrl: './vocabulary-modal.component.html',
  styleUrl: './vocabulary-modal.component.scss'
})
export class VocabularyModalComponent {

  @Input() vocabulary: Vocabulary | undefined
  @Input() translation: Translation | undefined
  @Input() vocabularyRange: VocabularyRange | undefined;
  @Input() translationWithVocabularyRange : TranslationWithVocabularyRange | undefined;
  @Input() onRemoveVocabularyClick: (translationId: number ) => void = () => {};
  @ViewChild(AddVocabularyFormComponent) addVocabularyFormComponent!: AddVocabularyFormComponent;

  constructor(public bsModalRef: BsModalRef) {
  }

  onSubmitClicked(): void {
    if (this.addVocabularyFormComponent) {
      this.addVocabularyFormComponent.onSubmit();
    }
  }

  onCloseClick(): void {
    this.bsModalRef.hide();
  }

  removeVocabulary(id: number) {
    this.onRemoveVocabularyClick(id);
    this.bsModalRef.hide();
  }

}
