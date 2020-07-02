import React, { Component } from 'react';
import { ControlBar } from '../ControlBar';
import { Puzzle } from '../Puzzle';
import { Buttons } from '../Buttons';
import { ControlBarContext, PuzzleContext } from '../context';
import { MAX_LEVEL } from '../../constants/constants';

import {
  getTipsSettings,
  getImageSrc,
  getNumberOfPages,
  getCurrentPageWords,
  getPuzzles,
} from '../../helpers';

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
    activeTips: getTipsSettings(),
    words: [],
    currentSentence: 1,
    puzzles: null,
    puzzleResults: new Array(10).fill([]),
    draggablePuzzle: null,
    painting: null,
  };

  componentDidMount = async () => {
    this.setPainting();
    await Promise.all([this.setNumberOfPages(), this.setCurrentPageWords()]);
    await this.setPuzzles();
  };

  setPainting = () => {
    const painting = getImageSrc(this.state.level.current, this.state.page.current);
    this.setState({ painting });
  };

  setNumberOfPages = async () => {
    const pages = await getNumberOfPages(this.state.level.current - 1);
    this.setState({ page: { ...this.state.page, maxPage: pages } });
  };

  setCurrentPageWords = async () => {
    const words = await getCurrentPageWords(this.state.level.current, this.state.page.current);
    this.setState({ words });
  };

  setPuzzles = async () => {
    const puzzles = await getPuzzles({
      src: this.state.painting.cutSrc,
      wordsList: this.state.words.map((word) => word.textExample),
    });

    this.setState({ puzzles });
  };

  changeLevel = ({ target: { value } }) => {
    const { level } = this.state;
    this.setState({ level: { ...level, current: value } });
  };
  changePage = ({ target: { value } }) => {
    const { page } = this.state;
    this.setState({ page: { ...page, current: value } });
  };

  onDragStart = (event, dataItem) => {
    console.log('dragstart on canvas: ', dataItem);
    event.dataTransfer.setData('dataItem', dataItem);
    this.setState({ draggablePuzzle: dataItem });
  };

  onDragOver = (event) => {
    event.preventDefault();
  };

  onDrop = (event, position) => {
    let dataItem = event.dataTransfer.getData('dataItem');
    const { puzzleResults, currentSentence, puzzles } = this.state;
    console.log(dataItem, position);

    const puzzle = puzzles[currentSentence - 1].filter(
      (puzzle) => puzzle.props.dataItem === dataItem
    );

    this.setState({ draggablePuzzle: null });

    console.log(puzzle[0]);

    if (position === 'result') {
      puzzleResults[currentSentence - 1] = [...puzzleResults[currentSentence - 1], ...puzzle];
      this.setState({ puzzleResults });

      const rawPuzzles = puzzles[currentSentence - 1].filter(
        (puzzle) => puzzle.props.dataItem !== dataItem
      );
      puzzles[currentSentence - 1] = [...rawPuzzles];
      this.setState({ puzzles });
    }
  };

  render() {
    const { level, page, puzzles, currentSentence, puzzleResults, draggablePuzzle } = this.state;
    return (
      <div className='game--wrapper'>
        <ControlBarContext.Provider
          value={{
            level,
            page,
            changeLevel: this.changeLevel,
            changePage: this.changePage,
          }}>
          <ControlBar />
        </ControlBarContext.Provider>
        <PuzzleContext.Provider
          value={{
            puzzles,
            currentSentence,
            puzzleResults,
            draggablePuzzle,
            onDragStart: this.onDragStart,
            onDragOver: this.onDragOver,
            onDrop: this.onDrop,
          }}>
          <Puzzle />
        </PuzzleContext.Provider>
        <Buttons />
      </div>
    );
  }
}

export default MainPage;
