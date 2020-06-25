import React, { Component } from 'react';

class NoStatisticsMessage extends Component {
  render() {
    return (
      <div className='message-stat'>
        <p>
          No statistics.<br/>
          Statistics are saved when the "New game" button is pressed
        </p>
      </div>
    );
  }
}

export default NoStatisticsMessage;
