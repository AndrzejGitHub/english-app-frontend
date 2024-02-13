import {PartOfSpeech} from "./part-of-speech";
import {Vocabulary} from "./vocabulary";
import {TranslationVariants} from "./translation-variants";

export interface Translation {
  id: number | undefined
  partOfSpeech: PartOfSpeech
  vocabulary: Vocabulary
  translationVariant: TranslationVariants
}
