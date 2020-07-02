import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const LevelSwitch = ({ level, onLevelChange }) => (
  <ul className='points'>
    {new Array(level.maxLevel).fill(1).map((point, i) => (
      <li
        className={clsx('point', {
          'point-active': i === level.current - 1,
        })}
        key={'level-' + (i + 1)}
        onClick={(e) => onLevelChange(+e.target.textContent)}>
        {i + 1}
      </li>
    ))}
  </ul>
);

LevelSwitch.propTypes = {
  level: PropTypes.shape({
    current: PropTypes.number,
    maxLevel: PropTypes.number,
  }).isRequired,
  onLevelChange: PropTypes.func.isRequired,
};
