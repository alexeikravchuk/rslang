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
    const isNotEmptyStatistics = statistics && Object.keys(statistics).length;

    return (
      <div className='stat-container'>
        <h3 className='title-stat'>Statistics</h3>
        {isNotEmptyStatistics ? (
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
            <StatisticsBody statistics={statistics} onClick={onClick} />
          </table>
        ) : (
          <NoStatisticsMessage />
        )}

        <button className='btn btn-stat return' onClick={onClick}>
          Return
        </button>
      </div>
    );
  }
}

export default Statistics;
