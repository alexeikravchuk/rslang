import {WORD_INFO_REQUEST_URL} from '../../constants/urlsRequests';

async function getWords(page, category) {
  const dataURL = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${category}`;
  const response = await fetch(dataURL);
  return await response.json();
}

const getWordInfo = (word) => {
  return fetch(`${WORD_INFO_REQUEST_URL}${word}`)
    .then(res => res.json());
};

export {getWords, getWordInfo};
