function findIndexTranscriptInWords(words, transcriptArr, setRecognizedWord) {
  const index = words.findIndex((word) => {
    const result = transcriptArr.find((transcript) => {
      return word.word.toLowerCase() === transcript.toLowerCase();
    });
    return result;
  });

  index >= 0
    ? setRecognizedWord(words[index].word)
    : setRecognizedWord(transcriptArr[0]);

  return index;
}

export function runSpeechRecognition(
  words,
  setRecognizedWord,
  checkRecognitionMode,
  activateCard
) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 4;

  recognition.addEventListener('result', (e) => {
    const transcriptArr = Array.from(e.results[0]).map((alt) => alt.transcript);
    if (e.results[0].isFinal) {
      const wordIndex = findIndexTranscriptInWords(
        words,
        transcriptArr,
        setRecognizedWord
      );
      wordIndex >= 0 && activateCard(wordIndex);
    }
  });

  recognition.addEventListener('end', () => {
    if (checkRecognitionMode()) {
      return recognition.start();
    }
    return recognition.stop();
  });

  recognition.start();
}
