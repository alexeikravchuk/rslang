const defaultSettings = {
  isAutoplay: true,
  isTranslate: true,
  isPronunciation: true,
  isBackgroundImg: false,
};

const getTipsSettings = () => {
  return localStorage.tipsSetting ? JSON.parse(localStorage.tipsSetting) : defaultSettings;
};

export { getTipsSettings };
