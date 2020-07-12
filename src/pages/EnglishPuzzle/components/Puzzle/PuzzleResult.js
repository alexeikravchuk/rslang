import React, { useContext } from 'react';
import { PuzzleContext } from '../context';
import { SENTENCE_STATUS } from '../../constants/constants';

const PuzzleResult = () => {
  const { puzzles, puzzleResults, currentSentence, sentenceStatus, painting } = useContext(
    PuzzleContext
  );
  const isShowPainting = sentenceStatus === SENTENCE_STATUS.FINISH;
  const currentLength = puzzles[currentSentence - 1] && puzzles[currentSentence - 1].length;

  const paintingStyle = {
    backgroundImage: `url(${painting && painting.cutSrc})`,
    opacity: 1,
  };
  const coloredStyle = {
    backgroundColor: '#a0a0f0ff',
  };

  return (
    <div className='game--puzzle-results result'>
      <div
        className='result-field--background'
        style={isShowPainting ? paintingStyle : coloredStyle}></div>
      {puzzleResults.map((puzzleRow, i) => (
        <div className={`result--sentence ${isShowPainting ? 'hidden' : ''}`} key={'row' + i}>
          <div
            className={'result--sentence-numeration' + (i + 1 > currentSentence ? ' hidden' : '')}>
            <span>{i + 1}</span>
          </div>
          {i + 1 === currentSentence ? (
            <PuzzleContext.Consumer>
              {({ onDragOver, onDrop, onPuzzleClick }) => (
                <div
                  className={`result--sentence-text_container${
                    i + 1 === currentSentence
                      ? currentLength
                        ? ' current-sentence'
                        : ' current-sentence filled'
                      : ''
                  }`}
                  onDragOver={onDragOver}
                  onDrop={(event) => onDrop(event, 'result')}
                  onClick={onPuzzleClick}>
                  {puzzleRow}
                </div>
              )}
            </PuzzleContext.Consumer>
          ) : (
            <div className='result--sentence-text_container'>{puzzleRow}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PuzzleResult;
