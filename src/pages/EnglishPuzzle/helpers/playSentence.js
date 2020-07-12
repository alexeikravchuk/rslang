import { DATA_LINK } from '../../../constants/urlsRequests';

let audio = null;

const playSentence = (word) => {
  const audioSrc = DATA_LINK + word.audioExample;
  try {
    if (audio && audio.played) {
      audio.pause();
    }
    audio = new Audio(audioSrc);
    audio.play().catch((e) => console.log(e.message));
  } catch (e) {
    console.log(e.message);
  }
};

export { playSentence };
