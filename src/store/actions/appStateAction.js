export const ADD_DAY_COUNTER = 'ADD_DAY_COUNTER';
export const RESET_DAY_COUNTER = 'RESET_DAY_COUNTER';

// INCREMENT day word counter
export const addDay = () => {
  return ({
    type: ADD_DAY_COUNTER,
  })
}

//RESET every day counter
export const reset = () => {
  return ({
    type: RESET_DAY_COUNTER,
  })
}
