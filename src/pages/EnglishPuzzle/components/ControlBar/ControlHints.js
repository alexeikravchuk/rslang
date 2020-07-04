import React, { useContext } from 'react';
import { ControlBarContext } from '../context';
import { playSentence } from '../../helpers';

const ControlHints = () => {
  const {
    activeTips: { isTranslate, isPronunciation },
    word,
  } = useContext(ControlBarContext);
  return (
    <div className='control--hints'>
      <div
        className={`audio-hint ${isPronunciation ? '' : 'hidden'}`}
        onClick={() => playSentence(word)}>
        <i className='material-icons'>volume_up</i>
        <span className='tooltiptext'>play pronunciation hint</span>
      </div>
      <div className={`translation-hint ${isTranslate ? '' : 'hidden'}`}>
        <p className='sentence-translated'>{word && word.textExampleTranslate}</p>
      </div>
    </div>
  );
};

export default ControlHints;
