import GameView from '../views/GameView';
import getNumberOfPages from '../utils/API-helpers/getNumberOfPages';
import getCurrentPageWords from '../utils/API-helpers/getCurrentPageWords';
import getImageSrc from '../utils/game-helpers/getImgSrc';
import getPuzzles from '../utils/game-helpers/getPuzzles';
import { AUDIO_SRC } from '../constants';

export default class GameModel {
  constructor(container) {
    this.container = container;
    this.view = new GameView(this, container);
  }

  async init() {
    const autoplay = localStorage.isAutoplayActive;

    this.state = {
      level: localStorage.level || 0,
      currentPage: localStorage.currentPage || 0,
      currentSentence: 0,
      isAutoplayActive: autoplay ? JSON.parse(autoplay) : true,
      isTranslateActive: localStorage.isTranslateActive || true,
      isPronunciationActive: localStorage.isPronunciationActive || true,
      isImageActive: localStorage.isImageActive || false,
    };
    await this.setData();
    return 1;
  }

  async setData() {
    this.state.imageSrcs = getImageSrc(
      this.state.level,
      this.state.currentPage
    );
    try {
      [this.state.pages, this.state.words] = await Promise.all([
        getNumberOfPages(this.state.level),
        getCurrentPageWords(this.state.level, this.state.currentPage),
      ]);

      this.state.puzzles = await getPuzzles({
        src: this.state.imageSrcs.cutSrc,
        wordsList: this.state.words.map((word) => word.textExample),
      });
      return 1;
    } catch (e) {
      this.container.innerHTML = e;
    }
    return 0;
  }

  start() {
    this.view.render();
    this.makePuzzleDragable();
    this.setListeners();
    if (+this.state.isAutoplayActive) {
      this.playSentence();
    }
  }

  setListeners() {
    document
      .getElementById('levels')
      .addEventListener('change', (e) => this.changePage(e));
    document
      .getElementById('pages')
      .addEventListener('change', (e) => this.changePage(e));
    this.container.addEventListener('click', (e) => this.determinateClick(e));
  }

  determinateClick(event) {
    if (
      event.target.classList.contains('canvas-item') &&
      event.target.parentElement.classList.contains('group-words')
    ) {
      const currentSentence = this.container.querySelector('.current-sentence');
      currentSentence.insertAdjacentElement('beforeend', event.target);
      return this.checkCurrentSentence();
    }
    if (
      event.target.classList.contains('canvas-item') &&
      event.target.parentElement.classList.contains('current-sentence')
    ) {
      if (localStorage.lastPuzzle) {
        const lastPuzzle = this.container.querySelector(
          `[data-item="${localStorage.lastPuzzle}"]`
        );
        lastPuzzle.classList.remove('active');
        localStorage.lastPuzzle = '';
        if (event.offsetX < event.target.clientWidth / 2) {
          event.target.insertAdjacentElement('beforebegin', lastPuzzle);
          return this.checkCurrentSentence();
        }
        event.target.insertAdjacentElement('afterend', lastPuzzle);
        return this.checkCurrentSentence();
      }
      localStorage.lastPuzzle = event.target.dataset.item;
      event.target.classList.add('active');
      return 1;
    }
    if (
      event.target.classList.contains('material-icons') &&
      event.target.parentElement.classList.contains('audio-hint')
    ) {
      return this.playSentence();
    }

    if (
      event.target.classList.contains('material-icons') &&
      event.target.parentElement.classList.contains('autoplay-btn')
    ) {
      event.target.parentElement.classList.toggle('disabled');
      localStorage.isAutoplayActive = !this.state.isAutoplayActive;
      this.state.isAutoplayActive = JSON.parse(localStorage.isAutoplayActive);
      return 1;
    }

    if (
      event.target.classList.contains('material-icons') &&
      event.target.parentElement.classList.contains('translate-btn')
    ) {
      event.target.parentElement.classList.toggle('disabled');
      this.container
        .querySelector('.sentence-translated')
        .classList.toggle('hidden');
      return 1;
    }

    if (
      event.target.classList.contains('material-icons') &&
      event.target.parentElement.classList.contains('listen-btn')
    ) {
      event.target.parentElement.classList.toggle('disabled');
      this.container.querySelector('.audio-hint').classList.toggle('hidden');
      return 1;
    }

    if (
      event.target.classList.contains('material-icons') &&
      event.target.parentElement.classList.contains('image-btn')
    ) {
      event.target.parentElement.classList.toggle('disabled');
      const puzzleBackground = this.container.querySelector(
        '.result-field--background'
      );
      puzzleBackground.classList.toggle('image');
      if (event.target.parentElement.classList.contains('disabled')) {
        puzzleBackground.style.backgroundImage = 'none';
        return 1;
      }
      puzzleBackground.style.backgroundImage = `url(${this.state.imageSrcs.cutSrc})`;
      return 1;
    }

    return 0;
  }

  async changePage(event) {
    if (event.target.id === 'levels') {
      this.state.level = event.target.value - 1;
      this.state.currentPage = 0;
      this.view.updatePageOptions();
    } else if (event.target.id === 'pages') {
      this.state.currentPage = event.target.value - 1;
    }

    this.state.currentSentence = 0;
    await this.setData();
    this.view.resetPuzzle();
    this.makePuzzleDragable();
    if (+this.state.isAutoplayActive) {
      this.playSentence();
    }
  }

  playSentence() {
    const audioSrc = `${AUDIO_SRC}${
      this.state.words[this.state.currentSentence].audioExample
    }`;
    if (!this.state.audioplay) {
      this.state.audioplay = new Audio(audioSrc);
      this.state.audioplay.play();
      this.state.audioplay.addEventListener('ended', () => {
        this.state.audioplay = '';
      });
    }
  }

  checkCurrentSentence() {
    const sentenceElement = this.view.currentSentenceElement;
    const sentenceLength = +this.state.words[this.state.currentSentence]
      .wordsPerExampleSentence;
    const canvasItems = sentenceElement.querySelectorAll('.canvas-item');
    const isCorectOrder = Array.from(canvasItems).every((item, i) => {
      if (+item.dataset.item.split('-')[1] === i + 1) {
        return true;
      }
      return false;
    });
    if (isCorectOrder && sentenceLength === canvasItems.length) {
      return this.showNextWords();
    }
    return 0;
  }

  showNextWords() {
    this.state.currentSentence += 1;
    this.view.showNextWords();
    if (+this.state.isAutoplayActive) {
      this.playSentence();
    }
  }

  makePuzzleDragable() {
    function drag(event) {
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.effectAllowed = 'copyMove';
      event.dataTransfer.setData('text', event.target.dataset.item);
    }

    function allowDrop(event) {
      event.preventDefault();
    }

    function drop(event) {
      event.preventDefault();
      const data = event.dataTransfer.getData('text');
      const element = document.querySelector(`[data-item="${data}"]`);
      element.style.cursor = 'grab';

      if (event.target.classList.contains('current-sentence')) {
        event.target.appendChild(element);
        return this.checkCurrentSentence();
      }
      if (event.target.classList.contains('canvas-item')) {
        if (event.offsetX < event.target.clientWidth / 2) {
          event.target.insertAdjacentElement('beforebegin', element);
          return this.checkCurrentSentence();
        }
        event.target.insertAdjacentElement('afterend', element);
        return this.checkCurrentSentence();
      }
      return 0;
    }

    this.state.puzzles.forEach((row) => {
      Array.from(row.querySelectorAll('[data-item]')).forEach((puzzle) => {
        puzzle.setAttribute('draggable', 'true');
        puzzle.addEventListener('dragstart', (event) => drag(event), false);
      });
    });

    Array.from(
      this.container.querySelectorAll('.result--sentence-text_container')
    ).forEach((sentenceBox) => {
      sentenceBox.addEventListener('dragover', (event) => allowDrop(event));
      sentenceBox.addEventListener('drop', (event) => drop.call(this, event));
    });
  }
}
