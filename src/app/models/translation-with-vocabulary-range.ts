export interface TranslationWithVocabularyRange {
  // translation: {
  //   id: undefined;
  //   partOfSpeech: { id: undefined; name: '' };
  //   vocabulary: {
  //     id: undefined;
  //     englishWord: '';
  //     imageURL: '';
  //   };
  //   translationVariant: { id: undefined; polishMeaning: '' };
  // };
  // vocabularyRange: {
  //   id: undefined;
  //   vocabulary_range: undefined;
  //   vocabulary: {
  //     id: undefined;
  //     englishWord: '';
  //     imageURL: '';
  //   };
  // };

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


