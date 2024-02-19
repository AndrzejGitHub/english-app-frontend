export interface TranslationWithVocabularyRange {
  translation: Translation
  vocabularyRange: VocabularyRange
}

export interface Translation {
  id: number | undefined
  partOfSpeech: PartOfSpeech
  vocabulary: Vocabulary
  translationVariant: TranslationVariant
}

export interface PartOfSpeech {
  id: number | undefined
  name: string
}

export interface Vocabulary {
  id: number | undefined
  englishWord: string
  imageURL: string
}

export interface TranslationVariant {
  id: number | undefined
  polishMeaning: string
}

export interface VocabularyRange {
  id: number | undefined
  vocabulary_range: number | undefined
  vocabulary: Vocabulary
}


