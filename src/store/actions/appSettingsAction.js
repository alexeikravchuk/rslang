export  const SET_SETTINGS = 'SET_SETTINGS';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';

export const setSettings = () => {
  return ({
    type: SET_SETTINGS,
  })
}

export const loadSettings = () => {
  return ({
    type: LOAD_SETTINGS,
  })
}
