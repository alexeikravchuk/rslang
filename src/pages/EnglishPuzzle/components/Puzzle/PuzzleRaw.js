import React, { useContext } from 'react';
import { PuzzleContext } from '../context';

const PuzzleRaw = () => {
  const {
    puzzles,
    whitePuzzles,
    currentSentence,
    onDragOver,
    onDrop,
    onPuzzleClick,
    isBackgroundImg,
  } = useContext(PuzzleContext);

  return (
    <div
      className='game--puzzle-raw raw'
      onDragOver={onDragOver}
      onDrop={(event) => onDrop(event, 'raw')}
      onClick={onPuzzleClick}>
      {(isBackgroundImg && puzzles && puzzles[currentSentence - 1]) ||
        (whitePuzzles && whitePuzzles[currentSentence - 1])}
    </div>
  );
};

export default PuzzleRaw;
