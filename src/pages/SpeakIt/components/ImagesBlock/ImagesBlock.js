import React from 'react';
import PropTypes from 'prop-types';
import startImg from '../../../../assets/speak_it_start_img.jpg';
import { DATA_LINK } from '../../../../constants/urlsRequests';

const ImagesBlock = ({ word, isRecognitionMode, recognizedWord }) => {
  const imgSrc = word ? DATA_LINK + word.image : startImg;

  return (
    <div className='images'>
      {<img className='img' src={imgSrc} alt=''></img>}
      <p className={'translation' + (isRecognitionMode ? ' none' : '') + (word ? '' : ' hidden')}>
        {word ? word.wordTranslate : ''}
      </p>
      <input
        className={'input' + (isRecognitionMode ? '' : ' none')}
        type='text'
        readOnly={true}
        value={recognizedWord || '...'}
      />
    </div>
  );
};

ImagesBlock.propTypes = {
  word: PropTypes.shape({
    word: PropTypes.string,
    wordTranslate: PropTypes.string,
  }),
  isRecognitionMode: PropTypes.bool,
  recognizedWord: PropTypes.string,
};

ImagesBlock.defaultProps = {
  word: {},
  isRecognitionMode: false,
  recognizedWord: '',
};

export default ImagesBlock;
