import React, { Component } from 'react';
import { Backdrop } from '@material-ui/core';
import { CardList } from '../CardList';
import { Statistics } from '../Statistics';
import { separateWords } from '../../helpers/separateWords';
import { getSavedResult } from '../../helpers/getSavedResult';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowStatistics: false,
      words: props.words,
      succesWordIndexes: props.succesWordIndexes,
    };
  }

  onClickHandler = (e) => {
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

  showSavedResult(target) {
    const { words, succesWordIndexes } = getSavedResult(target);
    this.setState({
      isShowStatistics: false,
      words,
      succesWordIndexes,
    });
  }

  getCards(words) {
    return (
      words.length && (
        <CardList
          words={words}
          activeCards={[]}
          onCardClick={this.props.onCardClick}
        />
      )
    );
  }

  render() {
    const errorWords = separateWords(
      this.state.words,
      this.state.succesWordIndexes,
      false
    );
    const errorCards = this.getCards(errorWords);

    const succesWords = separateWords(
      this.state.words,
      this.state.succesWordIndexes,
      true
    );
    const succesCards = this.getCards(succesWords);

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
            <div className='btns btns-res'>
              <button
                className='btn btn-res return'
                onClick={this.onClickHandler}>
                Return
              </button>
              <button
                className='btn btn-res new-game'
                onClick={this.onClickHandler}>
                New game
              </button>
              <button
                className='btn btn-res btn-stat'
                onClick={this.onClickHandler}>
                Statistics
              </button>
            </div>
          </div>
        )}
        {this.state.isShowStatistics && (
          <Statistics onClick={this.onClickHandler} />
        )}
      </Backdrop>
    );
  }
}

export default Results;
