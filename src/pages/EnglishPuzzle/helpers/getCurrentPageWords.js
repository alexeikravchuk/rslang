import { WORDS_PER_PAGE, WORDS_PER_SENTENCE } from '../constants/constants';
import { BACKEND_URL, DATA_LINK } from '../../../constants/urlsRequests';

async function getCurrentPageWords(group, page) {
  const url = `${BACKEND_URL}/words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=${WORDS_PER_PAGE}&wordsPerPage=${WORDS_PER_SENTENCE}`;
  try {
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      return content;
    }
    console.log(rawResponse);
    throw Error('error getting current page words');
  } catch (e) {
    console.log(e.message);
    const response = await fetch(`${DATA_LINK}/data/book${group}.js`);
    const allWords = await response.text();
    const currentPageWords = JSON.parse(allWords.split(' = ')[1].split(';\n')[0]).splice(
      (page - 1) * 10,
      page * 10
    );
    return currentPageWords;
  }
}

export { getCurrentPageWords };
