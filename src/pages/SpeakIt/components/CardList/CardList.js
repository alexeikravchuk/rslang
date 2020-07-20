import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const CardList = ({ words, activeCards, onCardClick }) => (
  <div className='cards'>
    {words.length ? (
      words.map((word, i) => (
        <Card
          word={word}
          isActive={activeCards.includes(i)}
          key={word.id}
          onCardClick={onCardClick}
        />
      ))
    ) : (
      <div className='spiner' />
    )}
  </div>
);

CardList.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object),
  activeCards: PropTypes.array,
  onCardClick: PropTypes.func,
};

CardList.defaultProps = {
  words: [],
  activeCards: [],
  onCardClick: () => {},
};

export default CardList;
