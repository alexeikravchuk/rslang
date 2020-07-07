import React, { useContext } from 'react';
import { PuzzleContext } from '../context';
import { SENTENCE_STATUS } from '../../constants/constants';

const PuzzleRaw = () => {
  const {
    puzzles,
    whitePuzzles,
    currentSentence,
    onDragOver,
    onDrop,
    onPuzzleClick,
    isBackgroundImg,
    sentenceStatus,
    painting,
  } = useContext(PuzzleContext);

  const isShowPainting = sentenceStatus === SENTENCE_STATUS.FINISH;

  return (
    <div
      className='game--puzzle-raw raw'
      onDragOver={onDragOver}
      onDrop={(event) => onDrop(event, 'raw')}
      onClick={onPuzzleClick}>
      {isShowPainting ? (
        <p className='painting-description'>{`${painting.author} — ${painting.name} (${painting.year})`}</p>
      ) : (
        (isBackgroundImg && puzzles && puzzles[currentSentence - 1]) ||
        (whitePuzzles && whitePuzzles[currentSentence - 1])
      )}
    </div>
  );
};

export default PuzzleRaw;
