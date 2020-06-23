import React, { Component } from 'react';
import startImg from '../../../../assets/speak_it_start_img.jpg';

class ImagesBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: startImg,
      translation: '',
      audioInput: '',
      isGameActive: false,
    };
  }
  render() {
    return (
      <div className='images'>
        {<img className='img' src={this.state.imgSrc} alt=''></img>}
        <p className={'translation' + (this.state.isGameActive ? ' none' : '')}>
          {this.state.translation}
        </p>
        <input
          className={'input' + (this.state.isGameActive ? '' : ' none')}
          type='text'
          readOnly={true}
          value={this.state.audioInput}
        />
      </div>
    );
  }
}

export default ImagesBlock;

//   reset() {
//     this.img.src = START_IMG_LINK;
//     this.translation.innerText = '';
//     this.audioInput.value = '';
//   }
