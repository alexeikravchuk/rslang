import React, { Component } from 'react';

class ControlHints extends Component {
  render() {
    const { word } = this.props;
    return (
      <div className='control--hints'>
        <div className='audio-hint'>
          <i className='material-icons'>volume_up</i>
          <span className='tooltiptext'>play pronunciation hint</span>
        </div>
        <div className='translation-hint'>
          <p className='sentence-translated'>
            {word && word.textExampleTranslate}
          </p>
        </div>
      </div>
    );
  }
}

export default ControlHints;
