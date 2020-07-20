export function separateWords(words, succesWordIndexes, isSucces) {
  return words.filter((_, index) =>
    isSucces
      ? succesWordIndexes.includes(index)
      : !succesWordIndexes.includes(index)
  );
}