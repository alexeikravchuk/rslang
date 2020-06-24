import { CARDS_LINK } from '../constants/constants';

//returns randomly the first or second half of 20 words
async function getWords(group, page) {
  const url = `${CARDS_LINK}group=${group - 1}&page=${page}`;
  const result = await fetch(url);
  const cardList = await result.json();

  const part = parseInt(Math.random() * 2, 10);
  return cardList.slice(part * 10, part * 10 + 10);
}

export { getWords };
