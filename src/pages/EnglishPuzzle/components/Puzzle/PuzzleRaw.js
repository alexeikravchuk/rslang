import React, { useContext } from 'react';
import { PuzzleContext } from '../context';

const PuzzleRaw = () => {
  const { puzzles, currentSentence } = useContext(PuzzleContext);

  return (
    <PuzzleContext.Consumer>
      {({ onDragOver, onDrop, onPuzzleClick }) => (
        <div
          className='game--puzzle-raw raw'
          onDragOver={onDragOver}
          onDrop={(event) => onDrop(event, 'raw')}
          onClick={onPuzzleClick}>
          {puzzles && puzzles[currentSentence - 1]}
        </div>
      )}
    </PuzzleContext.Consumer>
  );
};

export default PuzzleRaw;
