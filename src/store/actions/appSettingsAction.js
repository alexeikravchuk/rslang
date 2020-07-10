export const SET_SETTINGS = 'SET_SETTINGS';
export const SET_SETTINGS_SUCCESS = 'SET_SETTINGS_SUCCESS';
export const SET_SETTINGS_ERROR = 'SET_SETTINGS_ERROR';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const LOAD_SETTINGS_SUCCESS = 'LOAD_SETTINGS_SUCCESS';
export const GET_DEFAULT_STATE = 'GET_DEFAULT_STATE';

export const SET_PROPERTY_PERDAY = 'SET_PROPERTY_PERDAY';
export const SET_PROPERTY_OPTIONS = 'SET_PROPERTY_OPTIONS';

export const setSettings = (data, id, token) => {
  return dispatch => {
    dispatch({ type: SET_SETTINGS });
    return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(info => {
        dispatch({
          type: SET_SETTINGS_SUCCESS,
          info
        });
      })
      .catch(error => {
        dispatch({
          type: SET_SETTINGS_ERROR,
          error
        });
      });
  };
}

export const handleChangeStore = (name, value) => {
  return dispatch => {
    if (name === 'allWords') {
      dispatch({
        type: SET_PROPERTY_PERDAY,
        name,
        value
      })
    } else {
      dispatch({
        type: SET_PROPERTY_OPTIONS,
        name,
        value
      })
    }
  }
}

export const getSettings = (id, token) => {
  return async dispatch => {
    dispatch({ type: LOAD_SETTINGS });
    await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    }
    )
      .then(response => {
        if (response.status === 404) {
          throw new Error('404');
        } else {
          return response.json()
        }
      })
      .then(info => {
        dispatch({
          type: LOAD_SETTINGS_SUCCESS,
          info
        });
      })
      .catch(error => {
        if (error.message === '404') {
          dispatch({
            type: GET_DEFAULT_STATE,
          });
        }
      });
  };
}
