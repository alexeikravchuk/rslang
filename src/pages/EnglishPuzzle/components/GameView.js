import createElement from '../../utils/app-helpers/createElement';
import createControlElement from '../../utils/game-helpers/createControlElement';
import createGameFieldElement from '../../utils/game-helpers/createGameFieldElement';
import shufflePuzzles from '../../utils/game-helpers/shufflePuzzles';
import getOptionsNumberListHTML from '../../utils/game-helpers/getOptionsListHTML';

export default class GameView {
  constructor(model, container) {
    this.model = model;
    this.container = container;
  }

  render() {
    const gameContainer = createElement('div', 'game--wrapper');

    const control = createControlElement(this.model.state);
    const puzzle = createGameFieldElement(this.model.state);
    const buttons = createElement('div', 'game--buttons-wrapper');

    gameContainer.insertAdjacentElement('beforeend', control);
    gameContainer.insertAdjacentElement('beforeend', puzzle);
    gameContainer.insertAdjacentElement('beforeend', buttons);

    this.container.insertAdjacentElement('afterbegin', gameContainer);
  }

  get currentSentenceElement() {
    return this.container.querySelector('.current-sentence');
  }

  resetPuzzle() {
    const sentences = this.container.querySelectorAll('.result--sentence');
    sentences.forEach((item) => {
      item.firstElementChild.classList.add('hidden');
      item.lastElementChild.classList.remove('current-sentence');
    });
    this.container.querySelectorAll('.canvas-item').forEach((item) => item.remove());
    sentences[0].firstElementChild.classList.remove('hidden');
    sentences[0].lastElementChild.classList.add('current-sentence');
    this.container.querySelector('.group-words').remove();
    this.container.querySelector('.sentence-translated')
      .innerText = this.model.state.words[0].textExampleTranslate;
    this.container.querySelector('.raw')
      .insertAdjacentElement('afterbegin', shufflePuzzles(this.model.state.puzzles[0]));
  }

  updatePageOptions() {
    const pagesElement = this.container.querySelector('#pages');
    pagesElement.innerHTML = '';
    const options = getOptionsNumberListHTML(this.model.state.pages, this.model.state.currentPage);
    pagesElement.insertAdjacentHTML('afterbegin', options);
  }

  showNextWords() {
    const sentenceElements = this.container.querySelectorAll('.result--sentence');
    const currentSentenceNumber = this.model.state.currentSentence;
    if (currentSentenceNumber < 10) {
      this.container.querySelector('.sentence-translated')
        .innerText = this.model.state.words[currentSentenceNumber].textExampleTranslate;
      sentenceElements[currentSentenceNumber - 1].lastElementChild.classList.remove('current-sentence');
      sentenceElements[currentSentenceNumber].firstElementChild.classList.remove('hidden');
      sentenceElements[currentSentenceNumber].lastElementChild.classList.add('current-sentence');
      this.container.querySelector('.group-words').remove();
      this.container.querySelector('.raw')
        .insertAdjacentElement('afterbegin', shufflePuzzles(this.model.state.puzzles[currentSentenceNumber]));
    }
  }
}
