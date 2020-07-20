import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ word, isActive, onCardClick }) => (
  <div
    className={'card' + (isActive ? ' active-card' : '')}
    onClick={() => onCardClick(word.word)}>
    <span className='audio-icon' />
    <p className='word'>{word.word}</p>
    <p className='transcription'>{word.transcription}</p>
    <p className='translation'>{word.wordTranslate}</p>
  </div>
);

Card.propTypes = {
  word: PropTypes.shape({
    word: PropTypes.string,
    transcription: PropTypes.string,
    wordTranslate: PropTypes.string,
  }),
  isActive: PropTypes.bool,
  onCardClick: PropTypes.func,
};

Card.defautProps = {
  isActive: false,
  onCardClick: () => {},
};

export default Card;
