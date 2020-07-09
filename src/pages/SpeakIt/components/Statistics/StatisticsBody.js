import React from 'react';
import PropTypes from 'prop-types';

export const StatisticsBody = ({ statistics, onClick }) => {
  const keys = Object.keys(statistics);

  return (
    <tbody>
      {keys.map((key) => (
        <tr key={key}>
          <td>{key.split(', ')[0]}</td>
          <td>{key.split(', ')[1]}</td>
          <td>{statistics[key].succes}</td>
          <td>{statistics[key].errors}</td>
          <td>
            <button className='result-link' onClick={onClick}>
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
