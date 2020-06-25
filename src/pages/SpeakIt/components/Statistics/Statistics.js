import React, { Component } from 'react';
import StatisticsBody from './StatisticsBody';
import NoStatisticsMessage from './NoStatisticsMessage';

class Statistics extends Component {
  getStatistics = () => {
    if (!localStorage.stat) {
      return null;
    }
    return JSON.parse(localStorage.stat);
  };

  render() {
    const statistics = this.getStatistics();

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
          {statistics && (
            <StatisticsBody
              statistics={statistics}
              onClick={(e) => this.props.onClick(e)}
            />
          )}
        </table>
        {!statistics && <NoStatisticsMessage />}
        <button
          className='btn btn-stat return'
          onClick={(e) => this.props.onClick(e)}>
          Return
        </button>
      </div>
    );
  }
}

export default Statistics;
