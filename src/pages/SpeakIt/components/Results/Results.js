import React, { Component } from 'react';
import { Backdrop } from '@material-ui/core';
import { CardList } from '../CardList';
import { Statistics } from '../Statistics';
import { Buttons } from '../Buttons';
import { separateWords, getSavedResult, playCardsAudio } from '../../helpers';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowStatistics: false,
      words: props.words,
      succesWordIndexes: props.succesWordIndexes,
    };
  }

  handleCardClick = (targetWord) => {
    playCardsAudio(targetWord, this.state.words);
  };

  playAudio = (audioSrc) => {
    if (this.audio && this.audio.played) {
      this.audio.pause();
    }
    this.audio = new Audio(audioSrc);
    this.audio.play();
  };

  handleButtonClick = (e) => {
    if (e.target.classList.contains('btn-stat')) {
      if (e.target.classList.contains('return')) {
        return this.setState({ isShowStatistics: false });
      }
      return this.setState({ isShowStatistics: true });
    }
    if (e.target.classList.contains('result-link')) {
      return this.showSavedResult(e.target);
    }
    this.props.onButtonClick(e);
  };

  showSavedResult = (target) => {
    const { words, succesWordIndexes } = getSavedResult(target);
    this.setState({
      isShowStatistics: false,
      words,
      succesWordIndexes,
    });
  };

  getCards = (words) => {
    return (
      words.length && (
        <CardList
          words={words}
          activeCards={[]}
          onCardClick={this.handleCardClick}
        />
      )
    );
  };

  getErrorCards = () => {
    const errorWords = separateWords(
      this.state.words,
      this.state.succesWordIndexes,
      false
    );
    return this.getCards(errorWords);
  };

  getSuccesCards = () => {
    const succesWords = separateWords(
      this.state.words,
      this.state.succesWordIndexes,
      true
    );
    return this.getCards(succesWords);
  };

  render() {
    const errorCards = this.getErrorCards();
    const succesCards = this.getSuccesCards();
    return (
      <Backdrop className='results' open={true}>
        {!this.state.isShowStatistics && (
          <div className='results-container'>
            <p className='errors'>
              Errors:
              <span className='errors-num'>
                {this.state.words.length - this.state.succesWordIndexes.length}
              </span>
            </p>
            <div className='error-cards'>{errorCards ? errorCards : ''}</div>
            <p className='succes'>
              You know:
              <span className='succes-num'>
                {this.state.succesWordIndexes.length}
              </span>
            </p>
            <div className='succes-cards'>{succesCards ? succesCards : ''}</div>
            <Buttons
              onButtonClick={this.handleButtonClick}
              classes='btns-res'
              btns={[
                { classes: 'btn-res return', title: 'Return' },
                { classes: 'btn-res new-game', title: 'New game' },
                { classes: 'btn-res btn-stat', title: 'Statistics' },
              ]}
            />
          </div>
        )}
        {this.state.isShowStatistics && (
          <Statistics onClick={this.handleButtonClick} />
        )}
      </Backdrop>
    );
  }
}

export default Results;
