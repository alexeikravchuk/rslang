import React, { Component } from 'react';
import RaundSwitchers from './RaundSwitchers';
import { ControlButtons } from './ControlButtons';
import ControlHints from './ControlHints';

class ControlBar extends Component {
  render() {
    return (
      <>
        <div className='game--control-wrapper'>
          <RaundSwitchers />
          <ControlButtons />
        </div>
        <ControlHints />
      </>
    );
  }
}

export default ControlBar;
