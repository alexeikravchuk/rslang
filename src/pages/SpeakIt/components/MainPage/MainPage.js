import React, { Component } from 'react';

import { StatusBar } from '../StatusBar';
import { ImagesBlock } from '../ImagesBlock';
import { CardList } from '../CardList';
import { Buttons } from '../Buttons';
import { Results } from '../Results';
import { getWords, runSpeechRecognition, playCardsAudio } from '../../helpers';
import { MAX_LEVEL } from '../../constants/constants';

class MainPage extends Component {
  state = {
    level: {
      current: 1,
      maxLevel: MAX_LEVEL,
    },
    words: [],
    score: 0,
    activeCardIndexes: [],
    isRecognitionMode: false,
    recognizedWord: null,
    isResultsDisplayed: false,
  };

  componentDidMount = () => {
    this.setWords(this.state.level.current);
  };

  setWords = async (group) => {
    const page = parseInt(Math.random() * 30, 10);
    const part = parseInt(Math.random() * 2, 10);
    const words = await getWords(group - 1, page, part);
    this.setState({ words });
  };

  restartStudyCurrentPage = () => {
    this.setState({
      score: 0,
      activeCardIndexes: [],
      isRecognitionMode: false,
      recognizedWord: null,
      isResultsDisplayed: false,
    });
  };

  enableRecognitionMode = () => {
    this.setState({ activeCardIndexes: [], isRecognitionMode: true });
    this.startRecognizeSpeech();
  };

  startRecognizeSpeech = () => {
    this.setState({ score: 0 });
    runSpeechRecognition(
      this.state.words,
      this.setRecognizedWord,
      this.checkRecognitionMode,
      this.activateCard
    );
  };

  setRecognizedWord = (transcript) => this.setState({ recognizedWord: transcript });

  checkRecognitionMode = () => this.state.isRecognitionMode;

  activateCard = (index) => {
    if (!this.state.activeCardIndexes.includes(index)) {
      this.setState({
        activeCardIndexes: [...this.state.activeCardIndexes, index],
        score: this.state.score + 1,
      });

      if (this.state.score === this.state.words.length) {
        setTimeout(this.showResults(), 1000);
      }
    }
  };

  showResults = () => {
    !this.state.isRecognitionMode && this.setState({ activeCardIndexes: [] });
    this.setState({
      isResultsDisplayed: true,
      isRecognitionMode: false,
    });
  };

  startNewGame = () => {
    const { level } = this.state;
    this.restartStudyCurrentPage();
    this.setWords(level.current);
  };

  handleLevelChange = (value) => {
    this.setState({
      level: { current: value, maxLevel: 6 },
      activeCardIndexes: [],
      isRecognitionMode: false,
    });
    this.setWords(value);
  };

  handleCardClick = (targetWord) => {
    if (!this.state.isRecognitionMode) {
      const wordIndex = this.state.words.findIndex((word) => word.word === targetWord);
      !this.state.isResultsDisplayed && this.setState({ activeCardIndexes: [wordIndex] });
      playCardsAudio(targetWord, this.state.words);
    }
  };

  handleButtonClick = ({ target: { classList } }) => {
    if (classList.contains('restart')) {
      return this.restartStudyCurrentPage();
    }
    if (classList.contains('user-speach')) {
      return this.enableRecognitionMode();
    }
    if (classList.contains('result')) {
      document.body.style.overflow = 'hidden';
      return this.showResults();
    }
    document.body.style.overflow = 'auto';
    if (classList.contains('return')) {
      return this.setState({ isResultsDisplayed: false });
    }
    if (classList.contains('new-game')) {
      return this.startNewGame();
    }
  };

  render() {
    const {
      words,
      activeCardIndexes,
      level,
      score,
      isRecognitionMode,
      recognizedWord,
      isResultsDisplayed,
    } = this.state;

    const activeCard = activeCardIndexes.length ? words[activeCardIndexes.slice(-1)] : null;

    return (
      <div className='main-page'>
        <StatusBar level={level} score={score} onLevelChange={this.handleLevelChange} />
        <ImagesBlock
          word={activeCard}
          isRecognitionMode={isRecognitionMode}
          recognizedWord={recognizedWord}
        />
        <CardList
          words={words}
          activeCards={activeCardIndexes}
          onCardClick={this.handleCardClick}
        />
        <Buttons
          onButtonClick={this.handleButtonClick}
          btns={[
            { classes: 'restart', title: 'Restart' },
            { classes: 'voice user-speach', title: 'Speak please' },
            { classes: 'result', title: 'Results' },
          ]}
        />
        {isResultsDisplayed && (
          <Results
            onButtonClick={this.handleButtonClick}
            words={words}
            succesWordIndexes={activeCardIndexes}
          />
        )}
      </div>
    );
  }
}

export default MainPage;
