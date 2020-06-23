import { CARDS_LINK } from '../constants/constants';

async function getWords(group, page) {
  const url = `${CARDS_LINK}group=${group}&page=${page}`;
  const result = await fetch(url);
  const cardList = await result.json();
  return cardList;
}

export { getWords };
