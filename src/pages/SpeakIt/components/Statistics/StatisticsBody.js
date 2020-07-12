import React from 'react';
import PropTypes from 'prop-types';

export const StatisticsBody = ({ statistics, onClick }) => {
  const keys = Object.keys(statistics);

  return (
    <tbody>
      {keys.map((key) => (
        <tr key={key}>
          <td>{new Date(+key).toLocaleDateString()}</td>
          <td>{new Date(+key).toLocaleTimeString()}</td>
          <td>{statistics[key].ok.length}</td>
          <td>{10 - statistics[key].ok.length}</td>
          <td>
            <button className='result-link' onClick={(e) => onClick(e, key)}>
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
