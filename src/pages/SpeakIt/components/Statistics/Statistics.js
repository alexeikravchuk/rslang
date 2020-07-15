import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatisticsBody } from './StatisticsBody';
import { NoStatisticsMessage } from './NoStatisticsMessage';

class Statistics extends Component {
  static propTypes = {
    statistics: PropTypes.object,
    onClick: PropTypes.func.isRequired,
  };
  static defaultProps = {
    statistics: {},
  };

  render() {
    const { onClick, statistics } = this.props;
    console.log(statistics);
    return (
      <div className='stat-container'>
        <h3 className='title-stat'>Statistics</h3>
        <table className='table-stat'>
          <thead>
            <tr className='table-head'>
              <th className='th-date'>Date</th>
              <th className='th-time'>Time</th>
              <th className='th-succes'>Succes</th>
              <th className='th-errors'>Errors</th>
              <th className='th-option'>Link</th>
            </tr>
          </thead>
          {statistics ? <StatisticsBody statistics={statistics} onClick={onClick} /> : ''}
        </table>
        {!statistics && <NoStatisticsMessage />}
        <button className='btn btn-stat return' onClick={onClick}>
          Return
        </button>
      </div>
    );
  }
}

export default Statistics;
