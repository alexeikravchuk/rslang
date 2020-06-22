import React, { Component } from 'react';
import LevelSwitch from './LevelSwitch';
import Score from './Score';

class StatusBar extends Component {
  render() {
    return (
      <div className='status-bar'>
        <LevelSwitch level={this.props.level}/>
        <Score score={10}/>
      </div>
    );
  }
}

export default StatusBar;

// import LevelSwitch from './LevelSwitch';
// import Score from './Score';
// import { createElement } from '../utility';

// export default class StatusBar {
//   constructor() {
//     this.levelSwitch = null;
//     this.score = null;
//   }

//   init() {
//     this.levelSwither = new LevelSwitch();
//     this.score = new Score();
//     return this;
//   }

//   getElement() {
//     const statusBarElement = createElement('div', 'status-bar');
//     statusBarElement.append(this.levelSwither.getElement());
//     statusBarElement.append(this.score.getElement());
//     return statusBarElement;
//   }
// }