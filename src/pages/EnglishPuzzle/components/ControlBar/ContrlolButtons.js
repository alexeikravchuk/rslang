import React, { Component } from 'react';

class ContrlolButtons extends Component {
  render() {
    const { isAutoplayActive } = this.props;
    return (
      <div className='control--buttons'>
        <button
          className={'autoplay-btn' + (isAutoplayActive ? '' : ' disabled')}>
          <i className='material-icons'>volume_up</i>
          <span className='tooltiptext'>Autoplay</span>
        </button>
        <button className='translate-btn'>
          <i className='material-icons'>translate</i>
          <span className='tooltiptext'>Translate hint</span>
        </button>
        <button className='listen-btn'>
          <i className='material-icons'>music_note</i>
          <span className='tooltiptext'>Pronunciation hint </span>
        </button>
        <button className='image-btn disabled'>
          <i className='material-icons'>image</i>
          <span className='tooltiptext'>Image hint</span>
        </button>
      </div>
    );
  }
}

export default ContrlolButtons;
