import { createElement } from '../utility';
import { YANDEX_API_LINK, DATA_LINK } from '../constants';

export default class Card {
  constructor(state) {
    this.state = state;
    this.audio = this.setAudio();
    this.getTranslation();
  }

  getElement() {
    this.cardElement = createElement('div', 'card');
    this.cardElement.insertAdjacentHTML('afterbegin', `
      <span class="audio-icon"></span>
      <p class="word">${this.state.word}</p>
      <p class="transcription">${this.state.transcription}</p>
      <p class="translation">${this.state.translation}</p>
    `);
    return this.cardElement;
  }

  setAudio() {
    const audioSrc = DATA_LINK + this.state.audio;
    return new Audio(audioSrc);
  }

  async getTranslation() {
    const url = YANDEX_API_LINK + this.state.word;
    const res = await fetch(url);
    const json = await res.json();
    [this.state.translation] = json.text;
    this.cardElement.querySelector('.translation').innerText = json.text;
  }

  playAudio() {
    this.audio.play();
  }

  getImgSrc() {
    return DATA_LINK + this.state.image;
  }
}
