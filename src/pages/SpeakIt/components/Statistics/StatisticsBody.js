import React, { Component } from 'react';

class StatisticsBody extends Component {
  render() {
    const keys = Object.keys(this.props.statistics);
    return (
      <tbody>
        {keys.map((key) => (
          <tr key={key}>
            <td>{key.split(', ')[0]}</td>
            <td>{key.split(', ')[1]}</td>
            <td>{this.props.statistics[key].succes}</td>
            <td>{this.props.statistics[key].errors}</td>
            <td>
              <button
                className='result-link'
                onClick={(e) => this.props.onClick(e)}>
                Show
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default StatisticsBody;
