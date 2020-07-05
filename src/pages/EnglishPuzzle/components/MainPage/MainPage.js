import React, { Component } from 'react';
import { ControlBar } from '../ControlBar';
import { Puzzle } from '../Puzzle';
import { Buttons } from '../Buttons';
import { ControlBarContext, PuzzleContext } from '../context';
import { ROW_TYPE, BLANK_IMG } from '../../constants/constants';

import {
  getImageSrc,
  getNumberOfPages,
  getCurrentPageWords,
  getPuzzles,
  getDefaultState,
  saveTipsSetting,
  playSentence,
} from '../../helpers';

class MainPage extends Component {
  state = getDefaultState();

  componentDidMount = async () => {
    await this.setData();
    if (this.state.activeTips.isAutoplay) {
      playSentence(this.state.words[0]);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {
      page,
      level,
      activeTips,
      activeTips: { isAutoplay, isTranslate, isPronunciation, isBackgroundImg },
    } = this.state;
    if (prevState.page.current !== page.current || prevState.level.current !== level.current) {
      return this.resetLevel();
    }
    if (
      prevState.activeTips.isAutoplay !== isAutoplay ||
      prevState.activeTips.isTranslate !== isTranslate ||
      prevState.activeTips.isPronunciation !== isPronunciation ||
      prevState.activeTips.isBackgroundImg !== isBackgroundImg
    ) {
      return saveTipsSetting(activeTips);
    }
  };

  setData = async () => {
    this.setPainting();
    await Promise.all([this.setNumberOfPages(), this.setCurrentPageWords()]);
    await this.setPuzzles();
    await this.setWhitePuzzles();
    return 1;
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
    const words = await getCurrentPageWords(
      this.state.level.current - 1,
      this.state.page.current - 1
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

  setWhitePuzzles = async () => {
    const whitePuzzles = await getPuzzles({
      src: BLANK_IMG,
      wordsList: this.state.words.map((word) => word.textExample),
    });

    this.setState({ whitePuzzles });
  };

  changeLevel = ({ target: { value } }) => {
    const { level } = this.state;
    this.setState({ level: { ...level, current: value } });
  };
  changePage = ({ target: { value } }) => {
    const { page } = this.state;
    this.setState({ ...getDefaultState(), page: { ...page, current: value } });
  };

  resetLevel = async () => {
    this.setState({
      currentSentence: 1,
      puzzles: null,
      puzzleResults: new Array(10).fill([]),
      draggablePuzzle: null,
    });
    await this.setData();
    if (this.state.activeTips.isAutoplay) {
      playSentence(this.state.words[0]);
    }
  };

  onDragStart = (event, dataItem) => {
    if (this.state.currentSentence !== +dataItem.slice(0, 1)) return;
    event.dataTransfer.setData('dataItem', dataItem);
    this.setState({ draggablePuzzle: dataItem });
  };

  onDragOver = (event) => {
    event.preventDefault();
  };

  onDrop = (event, rowType) => {
    const { dataTransfer, target, nativeEvent } = event;

    let dataItem = dataTransfer.getData('dataItem');
    if (this.state.currentSentence !== +dataItem.slice(0, 1)) return;

    this.setState({ draggablePuzzle: null });
    const droppedPuzzle = this.findPuzzle(dataItem);

    setTimeout(this.checkResult, 500);

    if (rowType === ROW_TYPE.RESULT && target.classList.contains('current-sentence')) {
      this.removePuzzle(dataItem);
      return this.addPuzzleToCurrentSentence(droppedPuzzle);
    }
    if (target.classList.contains('canvas-item')) {
      this.removePuzzle(dataItem);
      return this.addPuzzleBeside(
        target,
        target.getAttribute('data-item'),
        nativeEvent.offsetX,
        droppedPuzzle
      );
    }
  };

  checkResult = () => {
    const { puzzleResults, currentSentence, words } = this.state;

    const sentenceLength = +words[currentSentence - 1].wordsPerExampleSentence;
    const isCorectOrder = puzzleResults[currentSentence - 1].every((item, i) => {
      if (+item.key.split('-')[1] === i + 1) {
        return true;
      }
      return false;
    });
    if (isCorectOrder && sentenceLength === puzzleResults[currentSentence - 1].length) {
      if (this.state.activeTips.isAutoplay) {
        playSentence(this.state.words[currentSentence]);
      }
      return (
        currentSentence < words.length && this.setState({ currentSentence: currentSentence + 1 })
      );
    }
    return 0;
  };

  findPuzzle = (dataItem) => {
    return this.findPuzzleInRaw(dataItem) || this.findPuzzleInResult(dataItem);
  };

  findPuzzleInRaw = (dataItem) => {
    const {
      currentSentence,
      puzzles,
      whitePuzzles,
      activeTips: { isBackgroundImg },
    } = this.state;
    if (isBackgroundImg) {
      return puzzles[currentSentence - 1].find((puzzle) => puzzle.props.dataItem === dataItem);
    }
    return whitePuzzles[currentSentence - 1].find((puzzle) => puzzle.props.dataItem === dataItem);
  };

  findPuzzleInResult = (dataItem) => {
    const { puzzleResults, currentSentence } = this.state;
    return puzzleResults[currentSentence - 1].find(
      (puzzle) => puzzle && puzzle.props.dataItem === dataItem
    );
  };

  findPuzzleIndexInRaw = (dataItem) => {
    const { currentSentence, puzzles } = this.state;
    return puzzles[currentSentence - 1].findIndex((puzzle) => puzzle.props.dataItem === dataItem);
  };

  findPuzzleIndexInResult = (dataItem) => {
    const { puzzleResults, currentSentence } = this.state;
    return puzzleResults[currentSentence - 1].findIndex(
      (puzzle) => puzzle && puzzle.props.dataItem === dataItem
    );
  };

  findPuzzleIndexInRawWhite = (dataItem) => {
    const { whitePuzzles, currentSentence } = this.state;
    return whitePuzzles[currentSentence - 1].findIndex(
      (puzzle) => puzzle && puzzle.props.dataItem === dataItem
    );
  };

  removePuzzle = (dataItem) => {
    this.removePuzzleFrom(dataItem, ROW_TYPE.RESULT);
    this.removePuzzleFrom(dataItem, ROW_TYPE.RAW);
  };

  removePuzzleFrom = (dataItem, rowType) => {
    const { puzzleResults, currentSentence, puzzles, whitePuzzles } = this.state;

    if (rowType === ROW_TYPE.RESULT) {
      const resultRow = this.filterRow(puzzleResults, dataItem);
      puzzleResults[currentSentence - 1] = [...resultRow];
    } else {
      const rawRow = this.filterRow(puzzles, dataItem);
      puzzles[currentSentence - 1] = [...rawRow];
      const rawRowWhite = this.filterRow(whitePuzzles, dataItem);
      whitePuzzles[currentSentence - 1] = [...rawRowWhite];
    }

    this.setState({ puzzleResults, puzzles, whitePuzzles });
  };

  filterRow = (puzzles, dataItem) => {
    const { currentSentence } = this.state;
    return puzzles[currentSentence - 1].filter(
      (puzzle) => puzzle && puzzle.props.dataItem !== dataItem
    );
  };

  addPuzzleToCurrentSentence = (puzzle) => {
    const { puzzleResults, currentSentence } = this.state;
    puzzleResults[currentSentence - 1] = [...puzzleResults[currentSentence - 1], puzzle];
    this.setState({ puzzleResults });
  };

  addPuzzleBeside(target, targetItem, offsetX, droppedPuzzle) {
    if (offsetX < target.clientWidth / 2) {
      return this.insertPuzzle('before', targetItem, droppedPuzzle);
    }
    return this.insertPuzzle('after', targetItem, droppedPuzzle);
  }

  insertPuzzle(place, targetItem, droppedPuzzle) {
    const { puzzleResults, puzzles, whitePuzzles, currentSentence } = this.state;
    if (this.findPuzzleInResult(targetItem)) {
      let index = this.findPuzzleIndexInResult(targetItem);
      index = place === 'after' ? index + 1 : index;
      puzzleResults[currentSentence - 1].splice(index, 0, droppedPuzzle);
    } else {
      let index = this.findPuzzleIndexInRaw(targetItem);
      index = place === 'after' ? index + 1 : index;
      puzzles[currentSentence - 1].splice(index, 0, droppedPuzzle);

      let indexWhite = this.findPuzzleIndexInRawWhite(targetItem);
      indexWhite = place === 'after' ? indexWhite + 1 : indexWhite;
      whitePuzzles[currentSentence - 1].splice(indexWhite, 0, droppedPuzzle);
    }
    this.setState({ puzzleResults, puzzles, whitePuzzles });
  }

  handlePuzzleClick = ({ target, currentTarget, nativeEvent }) => {
    const dataItem = target.getAttribute('data-item');
    if (currentTarget.classList.contains('raw') && target.classList.contains('canvas-item')) {
      return this.movePuzzleFromRawToSentence(dataItem);
    }
    if (currentTarget.className.includes('current') && target.classList.contains('canvas-item')) {
      return this.swabPuzzles(target, dataItem, nativeEvent.offsetX);
    }
  };

  movePuzzleFromRawToSentence = (dataItem) => {
    const puzzle = this.findPuzzleInRaw(dataItem);
    this.removePuzzleFrom(dataItem, ROW_TYPE.RAW);
    this.addPuzzleToCurrentSentence(puzzle);
    this.setState({ draggablePuzzle: null });
    return this.checkResult();
  };

  swabPuzzles = (target, dataItem, offsetX) => {
    const { draggablePuzzle } = this.state;
    if (draggablePuzzle) {
      const droppedPuzzle = this.findPuzzleInResult(draggablePuzzle);
      this.setState({ draggablePuzzle: null });
      this.removePuzzleFrom(draggablePuzzle, ROW_TYPE.RESULT);
      this.addPuzzleBeside(target, dataItem, offsetX, droppedPuzzle);
      return this.checkResult();
    }
    return this.setState({ draggablePuzzle: dataItem });
  };

  handleControlButtonClick = ({ currentTarget: { className } }) => {
    const { activeTips } = this.state;
    const { isAutoplay, isTranslate, isPronunciation, isBackgroundImg } = activeTips;

    if (className.includes('autoplay')) {
      return this.setState({ activeTips: { ...activeTips, isAutoplay: !isAutoplay } });
    }
    if (className.includes('translate')) {
      return this.setState({ activeTips: { ...activeTips, isTranslate: !isTranslate } });
    }
    if (className.includes('listen')) {
      return this.setState({ activeTips: { ...activeTips, isPronunciation: !isPronunciation } });
    }
    if (className.includes('image')) {
      return this.setState({ activeTips: { ...activeTips, isBackgroundImg: !isBackgroundImg } });
    }
  };

  render() {
    const {
      level,
      page,
      words,
      puzzles,
      whitePuzzles,
      currentSentence,
      puzzleResults,
      draggablePuzzle,
      activeTips,
    } = this.state;
    return (
      <div className='game--wrapper'>
        <ControlBarContext.Provider
          value={{
            level,
            page,
            activeTips,
            word: words[currentSentence - 1],
            changeLevel: this.changeLevel,
            changePage: this.changePage,
            onControlButtonClick: this.handleControlButtonClick,
          }}>
          <ControlBar />
        </ControlBarContext.Provider>
        <PuzzleContext.Provider
          value={{
            puzzles,
            whitePuzzles,
            currentSentence,
            puzzleResults,
            draggablePuzzle,
            checked: false,
            isBackgroundImg: activeTips.isBackgroundImg,
            onDragStart: this.onDragStart,
            onDragOver: this.onDragOver,
            onDrop: this.onDrop,
            onPuzzleClick: this.handlePuzzleClick,
          }}>
          <Puzzle />
        </PuzzleContext.Provider>
        <Buttons />
      </div>
    );
  }
}

export default MainPage;