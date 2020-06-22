import {WORD_REQUEST_URL} from '../../../constants/urlsRequests'

export const getWords = (page, category) => {
  return fetch(`${WORD_REQUEST_URL}page=${page}&group=${category}`)
    .then(res => res.json());
}