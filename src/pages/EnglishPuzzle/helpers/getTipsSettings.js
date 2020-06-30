const checkAutoplaySetting = () => {
  const isAutoplay = localStorage.isAutoplayActive
    ? JSON.parse(localStorage.isAutoplayActive)
    : true;
  return isAutoplay;
};

const checkTranslateSetting = () => {
  const isTranslate = localStorage.isTranslateActive
    ? JSON.parse(localStorage.isTranslateActive)
    : true;
  return isTranslate;
};

const checkPronunciationSetting = () => {
  const isPronunciation = localStorage.isPronunciationActive
    ? JSON.parse(localStorage.isPronunciationActive)
    : true;
  return isPronunciation;
};

const checkBackgroundImgSetting = () => {
  const isBackgroundImg = localStorage.isBackgroundImg
    ? JSON.parse(localStorage.isBackgroundImg)
    : true;
  return isBackgroundImg;
};

export const getTipsSettings = () => {
  return {
    isAutoplay: checkAutoplaySetting(),
    isTranslate: checkTranslateSetting(),
    isPronunciation: checkPronunciationSetting(),
    isBackgroundImg: checkBackgroundImgSetting(),
  };
};
