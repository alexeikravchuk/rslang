import { WORD_REQUEST_URL } from '../../../constants/urlsRequests';

export default async function getWords(page, category) {
  const url = `${WORD_REQUEST_URL}page=${page - 1}&group=${category - 1}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
