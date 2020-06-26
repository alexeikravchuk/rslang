import React, { Component } from 'react';
import { StatusBar } from '../StatusBar';
import { ImagesBlock } from '../ImagesBlock';
import { CardList } from '../CardList';
import { Buttons } from '../Buttons';
import { Results } from '../Results';

import {
  getWords,
  runSpeechRecognition,
  saveResult,
  playCardsAudio,
} from '../../helpers';
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
    const words = await getWords(group, page);
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

  setRecognizedWord = (transcript) =>
    this.setState({ recognizedWord: transcript });

  checkRecognitionMode = () => this.state.isRecognitionMode;

  activateCard = (index) => {
    if (!this.state.activeCardIndexes.includes(index)) {
      this.setState({
        activeCardIndexes: [...this.state.activeCardIndexes, index],
      });
      this.setState({ score: this.state.score + 1 });
      if (this.state.score === this.state.words.length) {
        setTimeout(
          () =>
            this.setState({
              isResultsDisplayed: true,
              isRecognitionMode: false,
            }),
          1000
        );
      }
    }
  };

  handleLevelChange = (value) => {
    console.log(value);
    this.setState({
      level: { current: value, maxLevel: 6 },
      activeCardIndexes: [],
      isRecognitionMode: false,
    });
    this.setWords(value);
  };

  handleCardClick = (targetWord) => {
    if (this.state.isRecognitionMode) {
      return;
    }
    const wordIndex = this.state.words.findIndex(
      (word) => word.word === targetWord
    );
    !this.state.isResultsDisplayed &&
      this.setState({ activeCardIndexes: [wordIndex] });
    playCardsAudio(targetWord, this.state.words);
  };

  handleButtonClick = (e) => {
    if (e.target.classList.contains('restart')) {
      return this.restartStudyCurrentPage();
    }

    if (e.target.classList.contains('user-speach')) {
      return this.enableRecognitionMode();
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
  };

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
        <Buttons
          onButtonClick={this.handleButtonClick}
          btns={[
            { classes: 'restart', title: 'Restart' },
            { classes: 'voice user-speach', title: 'Speak please' },
            { classes: 'result', title: 'Results' },
          ]}
        />
        {this.state.isResultsDisplayed && (
          <Results
            onButtonClick={this.handleButtonClick}
            words={this.state.words}
            succesWordIndexes={this.state.activeCardIndexes}
          />
        )}
      </div>
    );
  }
}

export default MainPage;
