import {
  GET_DEFAULT_STATE,
  RESET_DAY_COUNTER,
  ADD_DAY_COUNTER,
  SET_SETTINGS,
  SET_SETTINGS_ERROR,
  SET_SETTINGS_SUCCESS,
  LOAD_SETTINGS,
  LOAD_SETTINGS_SUCCESS,
  SET_PROPERTY_OPTIONS,
  SET_PROPERTY_PERDAY
} from '../actions';

const defaultState = {
  data: {
    optional: {
      translate: true,
      description: false,
      example: false,
      transcription: false,
      image: false,
      newWords: 10,
    },
    wordsPerDay: 20,
  },
  loading: false,
  error: null,
}

const appStateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_SETTINGS: {
      return { ...state, loading: true };
    }
    case SET_PROPERTY_OPTIONS: {
      return {
        ...state,
        data: {
          ...state.data,
          optional: {
            ...state.data.optional,
            [action.name]: action.value
          }
        }
      };
    }

    case SET_PROPERTY_PERDAY: {
      return {
        ...state,
        data: {
          ...state.data,
          "wordsPerDay": action.value
        }
      };
    }

    case GET_DEFAULT_STATE: {
      return {
        ...state,
        data: state.data,
        loading: false,
        error: false
      };
    }

    case LOAD_SETTINGS_SUCCESS: {
      return {
        ...state,
        data: action.info,
        loading: false
      };
    }
    case SET_SETTINGS_SUCCESS: {
      return {
        ...state,
        data: action.info,
        loading: false,
      };
    }
    case SET_SETTINGS_ERROR: {
      return {
        error: action.error,
        loading: false
      };
    }
    case RESET_DAY_COUNTER: {
      return { ...state };
    }
    case ADD_DAY_COUNTER: {
      return { ...state };
    }
    case SET_SETTINGS: {
      return {
        ...state,
        loading: true
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default appStateReducer
