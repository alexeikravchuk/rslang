import React from 'react';
import PropTypes from 'prop-types';

import { StatisticsBody } from './StatisticsBody';

const Statistics = ({ statistics, showData }) => {
  return (
    <div className='statistics-container'>
      <h3 className='statistics-title'>Statistics</h3>
      <p className='statistics-learned'>{`Total correctly collected ${statistics.learnedWords} sentences`}</p>
      <div className='table-container'>
        <table className='table-stat'>
          <thead>
            <tr className='table-head'>
              <th className='th-level'>Level-Page</th>
              <th className='th-date'>Date, Time</th>
              <th className='th-succes'>Succes</th>
              <th className='th-errors'>Errors</th>
              <th className='th-option'>Link</th>
            </tr>
          </thead>
          {<StatisticsBody statistics={statistics} onClick={showData} />}
        </table>
      </div>
    </div>
  );
};

Statistics.propTypes = {
  statistics: PropTypes.object.isRequired,
  showData: PropTypes.func,
};

Statistics.defaultProps = {
  showData: () => console.log('click'),
};

export { Statistics };
