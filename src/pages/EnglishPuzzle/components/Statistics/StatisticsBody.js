import React from 'react';
import PropTypes from 'prop-types';

export const StatisticsBody = ({ statistics, onClick }) => {
  const { optional } = statistics;
  const keys = Object.keys(optional).sort(
    (a, b) => +a.split('-')[0] * 100 + +a.split('-')[1] - +b.split('-')[0] * 100 + +b.split('-')[1]
  );

  const countLearnedWords = (results) => {
    return results.reduce((acc, result) => (result ? acc + 1 : acc), 0);
  };

  return (
    <tbody>
      {keys.map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{new Date(optional[key].date).toLocaleString()}</td>
          <td>{countLearnedWords(optional[key].results)}</td>
          <td>{optional[key].results.length - countLearnedWords(optional[key].results)}</td>
          <td>
            <button className='result-link' onClick={() => onClick(key)}>
              Show
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

StatisticsBody.propTypes = {
  statistics: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
