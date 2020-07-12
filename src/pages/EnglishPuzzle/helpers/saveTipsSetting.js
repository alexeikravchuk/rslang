const saveTipsSetting = (tipsSetting) => {
  localStorage.tipsSetting = JSON.stringify(tipsSetting);
};

export { saveTipsSetting };
