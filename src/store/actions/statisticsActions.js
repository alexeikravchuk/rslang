import { BACKEND_URL } from '../../constants/urlsRequests';

export const STATISTICS = 'STATISTICS';

export const initialState = {
  learnedWords: 0,
  optional: {
    speakIt: {},
    puzzle: { lw: 0, stat: {} },
    sprint: {
      scoreRecord: 0,
      totalScore: 0,
      gameCounter: 0,
    },
  },
};

export function loadStatistics(userId, token) {
  return async (dispatch) => {
    try {
      const rawResponse = await fetch(`${BACKEND_URL}/users/${userId}/statistics`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      switch (rawResponse.status) {
        case 200:
          const content = await rawResponse.json();
          return dispatch({ type: STATISTICS, payload: content.optional });
        case 404:
          throw Error('Statistics not found');
        case 401:
          throw Error('Access token is missing or invalid');
        default:
          Error('Request error');
      }
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function resetStatistics() {
  return (dispatch) => dispatch({ type: STATISTICS, payload: initialState.optional });
}

export function saveStatistics(userId, token, statistics) {
  return async (dispatch) => {
    try {
      const rawResponse = await fetch(`${BACKEND_URL}/users/${userId}/statistics`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(statistics),
      });

      switch (rawResponse.status) {
        case 200:
          const content = await rawResponse.json();
          return dispatch({ type: STATISTICS, payload: content.optional });
        case 400:
          throw Error('Bad request');
        case 401:
          throw Error('Access token is missing or invalid');
        default:
          Error('Request error');
      }
    } catch (e) {
      console.log(e.message);
    }
  };
}
