import React from 'react';
import PropTypes from 'prop-types';

import { LevelSwitch } from './LevelSwitch';
import { Score } from './Score';
import { MAX_LEVEL } from '../../constants/constants';

const StatusBar = ({ level, score, onLevelChange }) => (
  <div className='status-bar'>
    <LevelSwitch level={level} onLevelChange={onLevelChange} />
    <Score score={score} />
  </div>
);

StatusBar.propTypes = {
  level: PropTypes.shape({
    current: PropTypes.number,
    maxLevel: PropTypes.number,
  }),
  score: PropTypes.number,
  onLevelChange: PropTypes.func.isRequired,
};

StatusBar.defaultProps = {
  level: {
    current: 1,
    maxLevel: MAX_LEVEL,
  },
  score: 0,
};

export default StatusBar;
