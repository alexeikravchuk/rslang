import { createElement } from '../utility';

export default class Score {
  constructor() {
    this.score = 0;
  }

  getElement() {
    return this.buildElement();
  }

  buildElement() {
    this.scoreElement = createElement('div', 'score');
    return this.scoreElement;
  }

  increaseScore() {
    this.score += 1;
    this.scoreElement.append(createElement('div', 'star'));
  }

  resetScore() {
    this.score = 0;
    this.scoreElement.innerHTML = '';
  }
}
