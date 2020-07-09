import React, { useContext } from 'react';
import { ControlBarContext } from '../context';
import ControlButton from './ControlButton';

const ControlButtons = () => {
  const {
    activeTips: { isAutoplay, isTranslate, isPronunciation, isBackgroundImg },
    onControlButtonClick,
  } = useContext(ControlBarContext);

  const buttons = [
    {
      classes: 'autoplay-btn',
      isActive: isAutoplay,
      iconName: 'volume_up',
      tooltipText: 'Autoplay',
    },
    {
      classes: 'translate-btn',
      isActive: isTranslate,
      iconName: 'translate',
      tooltipText: 'Translate hint',
    },
    {
      classes: 'listen-btn',
      isActive: isPronunciation,
      iconName: 'music_note',
      tooltipText: 'Pronunciation hint',
    },
    {
      classes: 'image-btn',
      isActive: isBackgroundImg,
      iconName: 'image',
      tooltipText: 'Image hint',
    },
  ];

  return (
    <div className='control--buttons'>
      {buttons.map((props, i) => (
        <ControlButton {...props} key={'button' + i} onClick={onControlButtonClick} />
      ))}
    </div>
  );
};

export { ControlButtons };
