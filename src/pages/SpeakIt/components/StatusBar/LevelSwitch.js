import { createElement } from '../utility';

export default class LevelSwitch {
  constructor() {
    this.level = 1;
    this.maxLevel = 6;
  }

  getElement() {
    return this.buildElement();
  }

  buildElement() {
    const switcher = createElement('ul', 'points');
    for (let i = 0; i < this.maxLevel; i += 1) {
      const point = createElement('li', 'point');
      if (i === this.level - 1) {
        point.classList.add('active-point');
      }
      point.innerText = i + 1;
      switcher.append(point);
    }
    return switcher;
  }
}
