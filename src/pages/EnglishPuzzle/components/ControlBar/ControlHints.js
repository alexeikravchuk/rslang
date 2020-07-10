import React, { useContext } from 'react';
import { ControlBarContext } from '../context';
import { playSentence } from '../../helpers';
import { SENTENCE_STATUS } from '../../constants/constants';

const ControlHints = () => {
  const {
    activeTips: { isTranslate, isPronunciation },
    word,
    sentenceStatus,
  } = useContext(ControlBarContext);

  const isShowAllTips = sentenceStatus === SENTENCE_STATUS.SUCCESS;
  return (
    <div className='control--hints'>
      <div
        className={`audio-hint ${isPronunciation || isShowAllTips ? '' : 'hidden'}`}
        onClick={() => playSentence(word)}>
        <i className='material-icons'>volume_up</i>
        <span className='tooltiptext'>play pronunciation hint</span>
      </div>
      <div className={`translation-hint ${isTranslate || isShowAllTips ? '' : 'hidden'}`}>
        <p className='sentence-translated'>{word && word.textExampleTranslate}</p>
      </div>
    </div>
  );
};

export default ControlHints;
