import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Painting = ({ imgUrl, description }) => {
  return (
    <figure className='results-painting'>
      <Link to={imgUrl} target='_blank'>
        <img className='results-painting--img' src={imgUrl} alt='painting' />
      </Link>
      <figcaption className='results-painting--description'>{description}</figcaption>
    </figure>
  );
};

Painting.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export { Painting };
