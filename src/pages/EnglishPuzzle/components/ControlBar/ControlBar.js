import React, { Component } from 'react';
import RaundSwitchers from './RaundSwitchers';
import ContrlolButtons from './ContrlolButtons';
import ControlHints from './ControlHints';

class ControlBar extends Component {
  render() {
    const { isAutoplayActive, word } = this.props;
    return (
      <>
        <div className='game--control-wrapper'>
          <RaundSwitchers />
          <ContrlolButtons isAutoplayActive={isAutoplayActive} />
        </div>
        <ControlHints word={word} />
      </>
    );
  }
}

export default ControlBar;
