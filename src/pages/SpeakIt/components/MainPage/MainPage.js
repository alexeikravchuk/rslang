import React, { Component } from 'react';
import { StatusBar } from '../StatusBar';
import { ImagesBlock } from '../ImagesBlock';
import { CardList } from '../CardList';
import { Buttons } from '../Buttons';
import { getWords } from '../../helpers/getWords';
import { DATA_LINK } from '../../constants/constants';
import { Results } from '../Results';
import { runSpeechRecognition } from '../../helpers/runSpeechRecognition';
import { saveResult } from '../../helpers/saveResult';

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
      isWon: false,
      isResultsDisplayed: false,
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
      isResultsDisplayed: false,
    });
  }

  enableisRecognitionMode() {
    this.setState({ activeCardIndexes: [], isRecognitionMode: true });
    this.startRecognizeSpeech();
  }

  startRecognizeSpeech() {
    this.setState({ score: 0 });

    const setRecognizedWord = (transcript) =>
      this.setState({ recognizedWord: transcript });
    const checkRecognitionMode = () => this.state.isRecognitionMode;
    const activateCard = (index) => this.activateCard(index);

    runSpeechRecognition(
      this.state.words,
      setRecognizedWord,
      checkRecognitionMode,
      activateCard
    );
  }

  activateCard(index) {
    if (!this.state.activeCardIndexes.includes(index)) {
      this.setState({
        activeCardIndexes: [...this.state.activeCardIndexes, index],
      });
      this.setState({ score: this.state.score + 1 });
      if (this.state.score === 10) {
        setTimeout(
          () =>
            this.setState({
              isWon: true,
              isResultsDisplayed: true,
              isRecognitionMode: false,
            }),
          1000
        );
      }
    }
  }

  handleLevelChange(value) {
    this.setState({
      level: { current: value, maxLevel: 6 },
      activeCardIndexes: [],
      isRecognitionMode: false,
    });
    this.setWords(value);
  }

  handleCardClick(targetWord) {
    if (this.state.isRecognitionMode) {
      return;
    }
    const wordIndex = this.state.words.findIndex(
      (word) => word.word === targetWord
    );
    !this.state.isResultsDisplayed &&
      this.setState({ activeCardIndexes: [wordIndex] });
    this.playAudio(DATA_LINK + this.state.words[wordIndex].audio);
  }

  handleButtonClick(e) {
    if (e.target.classList.contains('restart')) {
      return this.restartStudyCurrentPage();
    }

    if (e.target.classList.contains('user-speach')) {
      return this.enableisRecognitionMode();
    }

    if (e.target.classList.contains('result')) {
      !this.state.isRecognitionMode && this.setState({ activeCardIndexes: [] });
      return this.setState({
        isResultsDisplayed: true,
        isRecognitionMode: false,
      });
    }

    if (e.target.classList.contains('return')) {
      return this.setState({ isResultsDisplayed: false });
    }
    if (e.target.classList.contains('new-game')) {
      saveResult(this.state.words, this.state.activeCardIndexes);
      this.restartStudyCurrentPage();
      return this.setWords(this.state.level.current);
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
        {this.state.isResultsDisplayed && (
          <Results
            onButtonClick={this.handleButtonClick}
            onCardClick={this.handleCardClick}
            words={this.state.words}
            succesWordIndexes={this.state.activeCardIndexes}
          />
        )}
      </div>
    );
  }
}

export default MainPage;
