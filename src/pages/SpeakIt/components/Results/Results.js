import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadStatistics, saveStatistics } from '../../../../store/actions/statisticsActions';
import { Backdrop } from '@material-ui/core';
import { CardList } from '../CardList';
import { Statistics } from '../Statistics';
import { Buttons } from '../Buttons';
import { separateWords, playCardsAudio, buildNewStatistics, getWords } from '../../helpers';

class Results extends Component {
  static propTypes = {
    words: PropTypes.arrayOf(PropTypes.object).isRequired,
    succesWordIndexes: PropTypes.array,
    onButtonClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    succesWordIndexes: [],
  };

  state = {
    isShowStatistics: false,
    words: this.props.words,
    succesWordIndexes: this.props.succesWordIndexes,
  };

  componentDidMount = () => {
    const { loadStatistics, userId, token } = this.props;
    loadStatistics(userId, token);
  };

  saveResult = () => {
    const { saveStatistics, userId, token, statistics } = this.props;
    const newStatistics = buildNewStatistics(statistics, this.state.succesWordIndexes);
    newStatistics && saveStatistics(userId, token, newStatistics);
  };

  handleCardClick = (targetWord) => {
    playCardsAudio(targetWord, this.state.words);
  };

  handleButtonClick = (e, key) => {
    if (e.target.classList.contains('btn-stat')) {
      if (e.target.classList.contains('return')) {
        return this.setState({ isShowStatistics: false });
      }
      return this.setState({ isShowStatistics: true });
    }
    if (e.target.classList.contains('result-link')) {
      return this.showSavedResult(key);
    }
    if (e.target.classList.contains('new-game')) {
      this.saveResult();
    }
    this.props.onButtonClick(e);
  };

  showSavedResult = async (key) => {
    const {
      gr: group,
      pg: page,
      pt: part,
      ok: succesWordIndexes,
    } = this.props.statistics.optional.speakIt[key];
    const words = await getWords(group, page, part);
    this.setState({
      isShowStatistics: false,
      words,
      succesWordIndexes,
    });
    localStorage.isStatLoaded = JSON.stringify(true);
  };

  getCards = (words) => {
    return (
      words.length && <CardList words={words} activeCards={[]} onCardClick={this.handleCardClick} />
    );
  };

  getErrorCards = () => {
    const errorWords = separateWords(this.state.words, this.state.succesWordIndexes, false);
    return this.getCards(errorWords);
  };

  getSuccesCards = () => {
    const succesWords = separateWords(this.state.words, this.state.succesWordIndexes, true);
    return this.getCards(succesWords);
  };

  render() {
    const errorCards = this.getErrorCards();
    const succesCards = this.getSuccesCards();
    const { words, succesWordIndexes, isShowStatistics } = this.state;
    const { speakIt: statistics } = this.props.statistics.optional;
    return (
      <Backdrop className='results' open={true}>
        {!isShowStatistics && (
          <div className='results-container'>
            <p className='errors'>
              Errors:
              <span className='errors-num'>{words.length - succesWordIndexes.length}</span>
            </p>
            <div className='error-cards'>{errorCards ? errorCards : ''}</div>
            <p className='succes'>
              You know:
              <span className='succes-num'>{succesWordIndexes.length}</span>
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
        {isShowStatistics && (
          <Statistics onClick={this.handleButtonClick} statistics={statistics} />
        )}
      </Backdrop>
    );
  }
}

const mapStateToProps = (store) => {
  const {
    statisticsReducer,
    authReducer: { token, userId },
  } = store;
  return { statistics: statisticsReducer, token, userId };
};

const mapDispatchToProps = {
  loadStatistics,
  saveStatistics,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
