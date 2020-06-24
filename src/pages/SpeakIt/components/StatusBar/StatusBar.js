import React, { Component } from 'react';
import LevelSwitch from './LevelSwitch';
import Score from './Score';

class StatusBar extends Component {
  render() {
    return (
      <div className='status-bar'>
        <LevelSwitch level={this.props.level} onLevelChange={this.props.onLevelChange}/>
        <Score score={this.props.score} />
      </div>
    );
  }
}

export default StatusBar;
