import React, { useContext } from 'react';
import { PuzzleContext } from '../context';

const PuzzleResult = () => {
  const { puzzleResults, currentSentence } = useContext(PuzzleContext);

  return (
    <div className='game--puzzle-results result'>
      <div className='result-field--background'></div>
      {puzzleResults.map((puzzleRow, i) => (
        <div className='result--sentence' key={'row' + i}>
          <div
            className={'result--sentence-numeration' + (i + 1 > currentSentence ? ' hidden' : '')}>
            <span>{i + 1}</span>
          </div>
          {i + 1 === currentSentence ? (
            <PuzzleContext.Consumer>
              {({ onDragOver, onDrop, onPuzzleClick }) => (
                <div
                  className={`result--sentence-text_container${
                    i + 1 === currentSentence ? ' current-sentence' : ''
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
