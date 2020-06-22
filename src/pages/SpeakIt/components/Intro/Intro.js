import { createElement } from '../utility';

export default class Intro {
  constructor() {
    this.buildElement();
    this.setButtonListener();
  }

  buildElement() {
    this.introElement = createElement('div', 'intro');
    this.introElement.insertAdjacentHTML('afterbegin', `
      <h1 class="title">SpeakIt</h1>
      <p class="intro-text">
        Click on the words to hear them sound.<br>
        Click on the button and speak the words into the microphone.
      </p>
      <a href="#" class="btn intro-btn">Start</a>
    `);
  }

  setButtonListener() {
    const button = this.introElement.querySelector('.intro-btn');
    button.addEventListener('click', () => this.hideIntro());
  }

  hideIntro() {
    const mainPage = document.querySelector('.main-page');
    this.introElement.classList.add('hidden');
    mainPage.classList.remove('hidden');
    document.getElementById('app-container').style.overflow = 'auto';
  }

  render(container) {
    container.append(this.introElement);
  }
}
