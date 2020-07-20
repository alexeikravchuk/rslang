import {DATA_LINK} from '../../../constants/urlsRequests';

export function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function playSound(word) {
  const audioSrc = DATA_LINK + word.audio;
  playFileSound(audioSrc);
}

let audio = null;

export function playFileSound(path) {
  try {
    if (audio && audio.played) {
      audio.pause();
    }
    audio = new Audio(path);
    audio.play().catch((e) => console.log(e.message));
  } catch (e) {
    console.log(e.message);
  }
}

export function pubAudioPath(sound) {
  return `${process.env.PUBLIC_URL}/audio/${sound}.mp3`;
}