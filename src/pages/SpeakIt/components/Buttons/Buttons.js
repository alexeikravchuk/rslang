import React, { Component } from 'react';

class Buttons extends Component {
  onClickHandler = (e) => {
    this.props.onButtonClick(e);
  };

  render() {
    return (
      <div className='btns'>
        <button className='btn restart' onClick={this.onClickHandler}>
          Restart
        </button>
        <button className='btn voice user-speach' onClick={this.onClickHandler}>
          Speak please
        </button>
        <button className='btn result' onClick={this.onClickHandler}>
          Results
        </button>
      </div>
    );
  }
}

export default Buttons;
