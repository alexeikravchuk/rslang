import React, { Component } from 'react';

class Buttons extends Component {
  render() {
    return (
      <div className='btns'>
        <button className='btn restart'>Restart</button>
        <button className='btn voice user-speach'>Speak please</button>
        <button className='btn result'>Results</button>
      </div>
    );
  }
}

export default Buttons;
