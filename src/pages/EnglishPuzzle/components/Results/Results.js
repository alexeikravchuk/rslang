import React from 'react';
import PropTypes from 'prop-types';
import { Painting } from './Painting';
import { Buttons } from '../Buttons';
import { getButtonsInfo } from '../../helpers';
import { BUTTONS_NAME } from '../../constants/constants';
import { ResultItem } from './ResultItem';

const Results = ({ words, results, painting, onBtnClick }) => {
  const shownButtons = getButtonsInfo([BUTTONS_NAME.CONTINUE, BUTTONS_NAME.STATISTICS]);
  const description = `${painting.author} — ${painting.name} (${painting.year})`;
  const youKnow = words.filter((word, i) => results[i]);
  const dontKnow = words.filter((word, i) => !results[i]);

  return (
    <div className='results'>
      <Painting imgUrl={painting.imageSrc} target='blank' description={description} />
      <div className='results-sentences'>
        <div className='results-dontknow'>
          <p className='results-dontknow--count'>
            You don't know:
            <span className='errors-num'>{dontKnow.length}</span>
          </p>
          {dontKnow.map((word) => (
            <ResultItem word={word} />
          ))}
        </div>
        <div className='results-youknow'>
          <p className='results-youknow--count'>
            You know:
            <span className='succes-num'>{youKnow.length}</span>
          </p>
          {youKnow.map((word) => (
            <ResultItem word={word} />
          ))}
        </div>
      </div>

      <Buttons buttons={shownButtons} onBtnClick={onBtnClick} />
    </div>
  );
};

Results.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object),
  results: PropTypes.arrayOf(PropTypes.number),
  painting: PropTypes.shape({
    author: PropTypes.string,
    cutSrc: PropTypes.string,
    id: PropTypes.string,
    imageSrc: PropTypes.string,
    name: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
  onBtnClick: PropTypes.func.isRequired,
};

export { Results };
