import React, { Component } from 'react';

class Card extends Component {
  handleCardClick = () => {
    this.props.onClick(this.props.word.word);
  };

  render() {
    return (
      <div
        className={'card' + (this.props.isActive ? ' active-card' : '')}
        onClick={this.handleCardClick}>
        <span className='audio-icon' />
        <p className='word'>{this.props.word.word}</p>
        <p className='transcription'>{this.props.word.transcription}</p>
        <p className='translation'>{this.props.word.wordTranslate}</p>
      </div>
    );
  }
}

export default Card;
