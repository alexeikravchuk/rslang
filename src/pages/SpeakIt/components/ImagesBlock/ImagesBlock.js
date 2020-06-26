import React, { Component } from 'react';
import startImg from '../../../../assets/speak_it_start_img.jpg';
import { DATA_LINK } from '../../constants/constants';

class ImagesBlock extends Component {
  render() {
    const imgSrc = this.props.word
      ? DATA_LINK + this.props.word.image
      : startImg;

    return (
      <div className='images'>
        {<img className='img' src={imgSrc} alt=''></img>}
        <p
          className={
            'translation' +
            (this.props.isRecognitionMode ? ' none' : '') +
            (this.props.word ? '' : ' hidden')
          }>
          {this.props.word ? this.props.word.wordTranslate : ''}
        </p>
        <input
          className={'input' + (this.props.isRecognitionMode ? '' : ' none')}
          type='text'
          readOnly={true}
          value={this.props.recognizedWord || '...'}
        />
      </div>
    );
  }
}

export default ImagesBlock;
