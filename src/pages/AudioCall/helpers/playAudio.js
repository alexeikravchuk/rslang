let audio = null;

const playAudio = (audioSrc) => {
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

export { playAudio };
