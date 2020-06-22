import Card from './Card';
import { createElement } from '../utility';
import { CARDS_LINK } from '../constants';

export default class CardList {
  constructor() {
    this.group = 0;
    this.page = 0;
    this.cardList = null;
  }

  init() {
    this.cardListElement = createElement('div', 'cards');
    this.getNewCards();
    return this;
  }

  getNewCards() {
    this.page = parseInt(Math.random() * 30, 10);
    this.getWords(this.page, this.group)
      .then(() => this.createCardList())
      .then(() => this.appendCards());
  }

  async getWords(page, group) {
    const url = `${CARDS_LINK}group=${group}&page=${page}`;
    const res = await fetch(url);
    this.cardList = await res.json();
  }

  createCardList() {
    const part = parseInt(Math.random() * 2, 10);
    this.cardList.splice(part * 10, 10);
    this.cardList = this.cardList.map((state) => new Card(state));
  }

  appendCards() {
    this.cardListElement.innerHTML = '';
    this.cardList.forEach((card) => this.cardListElement.append(card.getElement()));
  }

  getElement() {
    return this.cardListElement;
  }
}
