import { WORDS_LINK } from '../constants/constants';

//returns randomly the first or second half of 20 words
async function getWords(group, page, part) {
  const url = `${WORDS_LINK}group=${group}&page=${page}`;
  const result = await fetch(url);
  const cardList = await result.json();

  localStorage.currentWords = JSON.stringify({ group, page, part });

  return cardList.slice(part * 10, part * 10 + 10);
}

export { getWords };
