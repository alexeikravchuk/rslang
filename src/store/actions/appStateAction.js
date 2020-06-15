const ADD_DAY_COUNTER = 'ADD_DAY_COUNTER';
const RESET_DAY_COUNTER = 'RESET_DAY_COUNTER';

export const addDay = () => {
  return ({
    type: ADD_DAY_COUNTER,
  })
}

export const reset = () => {
  return ({
    type: RESET_DAY_COUNTER,
  })
}