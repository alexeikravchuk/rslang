import { DATA_LINK } from '../../../constants/urlsRequests';

let audio = null;

export function playCardsAudio(targetWord, words) {
  const wordIndex = words.findIndex((word) => word.word === targetWord);
  const audioSrc = DATA_LINK + words[wordIndex].audio;
  try {
    if (audio && audio.played) {
      audio.pause();
    }
    audio = new Audio(audioSrc);
    audio.play().catch((e) => console.log(e.message));
  } catch (e) {
    console.log(e.message);
  }
}
