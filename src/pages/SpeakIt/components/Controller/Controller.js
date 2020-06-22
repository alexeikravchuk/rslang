import { MODE } from '../constants';

export default class Controller {
  constructor({ statusBar, imagesBlock, cards }, results) {
    this.statusBar = statusBar;
    this.imagesBlock = imagesBlock;
    this.cards = cards;
    this.results = results;
    this.mode = MODE.listen;
    this.isRecognitionActive = false;
    this.setListeners();
  }

  setListeners() {
    document.addEventListener('click', (e) => this.determinateTarget(e));
  }

  determinateTarget(event) {
    if (event.target.classList.contains('card') && !this.isRecognitionActive) {
      return this.callCardAction(event.target);
    }
    if (event.target.parentElement.classList.contains('card') && !this.isRecognitionActive) {
      return this.callCardAction(event.target.parentElement);
    }
    if (event.target.classList.contains('user-speach') && !this.isRecognitionActive) {
      return this.enableSpeechRecognitionMode();
    }
    if (event.target.classList.contains('restart')) {
      return this.restartStudyCurrentPage();
    }
    if (event.target.classList.contains('point')) {
      return this.changeWordGroup(event.target);
    }
    if (event.target.classList.contains('result')) {
      return this.showResult();
    }
    if (event.target.classList.contains('new-game')) {
      return this.startNewGame();
    }

    return 0;
  }

  callCardAction(target) {
    const targetWord = target.querySelector('.word').innerText;
    const card = this.cards.cardList.filter((item) => item.state.word === targetWord)[0];
    if (!card) {
      return -1;
    }
    card.playAudio();
    this.imagesBlock.img.src = card.getImgSrc();
    this.imagesBlock.translation.innerText = card.state.translation;
    this.deactivateAllCards();
    if (!target.parentElement.classList.contains('error-cards')) {
      target.classList.add('active-card');
    }
    return -1;
  }

  deactivateAllCards() {
    this.cards.cardList.forEach((card) => card.cardElement.classList.remove('active-card'));
  }

  enableSpeechRecognitionMode() {
    this.switchMode(MODE.speak);
    this.startRecognizeSpeech();
  }

  switchMode(mode) {
    if (mode === MODE.speak) {
      this.imagesBlock.translation.classList.add('none');
      this.imagesBlock.audioInput.classList.remove('none');
      return 1;
    }
    if (mode === MODE.listen) {
      this.imagesBlock.translation.classList.remove('none');
      this.imagesBlock.audioInput.classList.add('none');
      return 1;
    }
    return -1;
  }

  startRecognizeSpeech() {
    this.deactivateAllCards();
    this.imagesBlock.reset();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 4;

    recognition.addEventListener('result', (e) => {
      const transcriptArr = Array.from(e.results[0])
        .map((alt) => alt.transcript);
      if (e.results[0].isFinal) {
        this.findTranscriptInCardList(transcriptArr);
      }
    });

    recognition.addEventListener('end', () => {
      if (this.isRecognitionActive) {
        return recognition.start();
      }
      return recognition.stop();
    });

    this.isRecognitionActive = true;
    recognition.start();
  }

  findTranscriptInCardList(transcriptArr) {
    const result = transcriptArr.map((transcript) => {
      const targetCard = this.cards.cardList.filter((card) => {
        const isMatch = card.state.word.toLowerCase() === transcript.toLowerCase();
        return isMatch;
      })[0];
      return targetCard;
    })
      .filter((card) => !!card)[0];
    if (result && !result.cardElement.classList.contains('active-card')) {
      result.cardElement.classList.add('active-card');
      this.imagesBlock.img.src = result.getImgSrc();
      this.imagesBlock.audioInput.value = result.state.word;
      if (this.statusBar.score.score === 9) {
        setTimeout(() => this.showResult(), 1000);
      }
      return this.statusBar.score.increaseScore();
    }
    [this.imagesBlock.audioInput.value] = transcriptArr;
    return -1;
  }

  restartStudyCurrentPage() {
    this.switchMode(MODE.listen);
    this.deactivateAllCards();
    this.imagesBlock.reset();
    this.isRecognitionActive = false;
    this.statusBar.score.resetScore();
  }

  changeWordGroup(target) {
    this.cards.group = target.innerText - 1;
    Controller.deactivateAllPoints();
    target.classList.add('active-point');
    this.restartStudyCurrentPage();
    this.cards.getNewCards();
  }

  static deactivateAllPoints() {
    document.querySelectorAll('.point').forEach((point) => point.classList.remove('active-point'));
  }

  showResult() {
    if (!this.isRecognitionActive) {
      this.restartStudyCurrentPage();
    }
    this.isRecognitionActive = false;
    this.results.showResult(this.cards.cardList);
    this.results.resultsElement.classList.remove('hidden');
    document.getElementById('app-container').style.overflow = 'hidden';
  }

  startNewGame() {
    this.results.resultsElement.classList.add('hidden');
    document.getElementById('app-container').style.overflow = 'auto';
    this.restartStudyCurrentPage();
    this.cards.getNewCards();
  }
}
