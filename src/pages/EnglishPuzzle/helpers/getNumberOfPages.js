import { WORDS_PER_PAGE, WORDS_PER_SENTENCE, BACKEND_URL } from '../constants/constants';

async function getNumberOfPages(group) {
  const url = `${BACKEND_URL}/words/count?group=${group}&wordsPerExampleSentenceLTE=${WORDS_PER_PAGE}&wordsPerPage=${WORDS_PER_SENTENCE}`;
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
      return content.count;
    }
    console.log(rawResponse);
    throw Error('error getting page count');
  } catch (e) {
    console.log(e.message);
    return 10;
  }
}

export { getNumberOfPages };
