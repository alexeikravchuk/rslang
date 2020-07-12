import { BACKEND_URL } from '../../constants/urlsRequests';

export const LOAD_STATISTICS = 'LOAD_STATISTICS';
export const SAVE_STATISTICS = 'SAVE_STATISTICS';

export function loadStatistics(userId, token) {
  return async (dispatch) => {
    const rawResponse = await fetch(`${BACKEND_URL}/users/${userId}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const content = await rawResponse.json();
    dispatch({ type: LOAD_STATISTICS, payload: content.optional });
  };
}

export function saveStatistics(userId, token, statistics) {
  return async (dispatch) => {
    const rawResponse = await fetch(`${BACKEND_URL}/users/${userId}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statistics),
    });

    const content = await rawResponse.json();

    dispatch({ type: LOAD_STATISTICS, payload: content.optional });
  };
}
