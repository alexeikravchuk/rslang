import React, { Component } from 'react';
import { StatusBar } from '../StatusBar';
import { ImagesBlock } from '../ImagesBlock';
import { CardList } from '../CardList';
import { Buttons } from '../Buttons';
import { getWords } from '../../helpers/getWords';
import { DATA_LINK } from '../../constants/constants';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: {
        current: 1,
        maxLevel: 6,
      },
      words: [],
      score: 0,
      activeCardIndexes: [],
      isRecognitionMode: false,
      recognizedWord: null,
    };
    this.audio = null;
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    this.setWords(this.state.level.current);
  }

  playAudio = (audioSrc) => {
    if (this.audio && this.audio.played) {
      this.audio.pause();
    }
    this.audio = new Audio(audioSrc);
    this.audio.play();
  };

  async setWords(group) {
    const page = parseInt(Math.random() * 30, 10);
    const words = await getWords(group, page);
    this.setState({ words });
  }

  restartStudyCurrentPage() {
    this.setState({
      score: 0,
      activeCardIndexes: [],
      isRecognitionMode: false,
      recognizedWord: null,
    });
  }

  enableisRecognitionMode() {
    this.setState({ activeCardIndexes: [], isRecognitionMode: true });
    this.startRecognizeSpeech();
  }

  startRecognizeSpeech() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 4;

    recognition.addEventListener('result', (e) => {
      const transcriptArr = Array.from(e.results[0]).map(
        (alt) => alt.transcript
      );
      if (e.results[0].isFinal) {
        const wordIndex = this.findIndexTranscriptInWords(transcriptArr);
        wordIndex >= 0 && this.activateCard(wordIndex);
      }
    });

    recognition.addEventListener('end', () => {
      if (this.state.isRecognitionMode) {
        return recognition.start();
      }
      return recognition.stop();
    });

    recognition.start();
  }

  findIndexTranscriptInWords(transcriptArr) {
    return this.state.words.findIndex((word) => {
      const result = transcriptArr.find((transcript) => {
        this.setState({ recognizedWord: transcript });
        return word.word.toLowerCase() === transcript.toLowerCase();
      });
      return result;
    });
  }

  activateCard(index) {
    if (!this.state.activeCardIndexes.includes(index)) {
      this.setState({
        activeCardIndexes: [...this.state.activeCardIndexes, index],
      });
      this.setState({ score: this.state.score + 1 });
      //   if (this.statusBar.score.score === 9) {
      //     setTimeout(() => this.showResult(), 1000);
      //   }
      //   return this.statusBar.score.increaseScore();
      // }
      // [this.imagesBlock.audioInput.value] = transcriptArr;
      // return -1;
    }
  }

  handleLevelChange(value) {
    this.setState({ level: { current: value, maxLevel: 6 } });
    this.setState({ activeCardIndexes: [] });
    this.setState({ isRecognitionMode: false });
    this.setWords(value);
  }

  handleCardClick(targetWord) {
    if (this.state.isRecognitionMode) {
      return;
    }
    const wordIndex = this.state.words.findIndex(
      (word) => word.word === targetWord
    );
    this.setState({ activeCardIndexes: [wordIndex] });
    this.playAudio(DATA_LINK + this.state.words[wordIndex].audio);
  }

  handleButtonClick(e) {
    console.log(e.target);
    if (e.target.classList.contains('restart')) {
      return this.restartStudyCurrentPage();
    }

    if (e.target.classList.contains('user-speach')) {
      return this.enableisRecognitionMode();
    }
  }

  render() {
    const activeCard = this.state.activeCardIndexes.length
      ? this.state.words[
          this.state.activeCardIndexes[this.state.activeCardIndexes.length - 1]
        ]
      : null;
    return (
      <div className='main-page'>
        <StatusBar
          level={this.state.level}
          score={this.state.score}
          onLevelChange={this.handleLevelChange}
        />
        <ImagesBlock
          word={activeCard}
          isRecognitionMode={this.state.isRecognitionMode}
          recognizedWord={this.state.recognizedWord}
        />
        <CardList
          words={this.state.words}
          activeCards={this.state.activeCardIndexes}
          onCardClick={this.handleCardClick}
        />
        <Buttons onButtonClick={this.handleButtonClick} />
      </div>
    );
  }
}

export default MainPage;
