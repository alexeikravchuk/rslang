import React, { Component } from 'react';
import { ControlBar } from '../ControlBar';
import { MAX_LEVEL } from '../../constants/constants';

import {
  getTipsSettings,
  getImageSrc,
  getNumberOfPages,
  getCurrentPageWords,
  getPuzzles,
} from '../../helpers';
import { Puzzle } from '../Puzzle';

class MainPage extends Component {
  state = {
    level: {
      current: 1,
      maxLevel: MAX_LEVEL,
    },
    page: {
      current: 1,
      maxPage: 1,
    },
    currentSentence: 0,
    activeTips: getTipsSettings(),
    words: [],
    painting: null,
  };

  componentDidMount = async () => {
    this.setPainting();
    await Promise.all([this.setNumberOfPages(), this.setCurrentPageWords()]);
    await this.setPuzzles();
  };

  setPainting = () => {
    const painting = getImageSrc(
      this.state.level.current,
      this.state.page.current
    );
    this.setState({ painting });
  };

  setNumberOfPages = async () => {
    const pages = await getNumberOfPages(this.state.level);
    this.setState({ page: { maxPage: pages } });
  };

  setCurrentPageWords = async () => {
    const words = await getCurrentPageWords(
      this.state.level.current,
      this.state.page.current
    );
    this.setState({ words });
  };

  setPuzzles = async () => {
    const puzzles = await getPuzzles({
      src: this.state.painting.cutSrc,
      wordsList: this.state.words.map((word) => word.textExample),
    });

    this.setState({ puzzles });
  };

  render() {
    return (
      <div className='game--wrapper'>
        <ControlBar />
        <Puzzle />
      </div>
    );
  }
}

export default MainPage;
