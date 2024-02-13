import {Vocabulary} from "./vocabulary";

export interface VocabularyRange {
  id: number | undefined;
  vocabulary_range: number | undefined;
  vocabulary: Vocabulary;
}
