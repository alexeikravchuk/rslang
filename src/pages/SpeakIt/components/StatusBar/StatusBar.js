import LevelSwitch from './LevelSwitch';
import Score from './Score';
import { createElement } from '../utility';

export default class StatusBar {
  constructor() {
    this.levelSwitch = null;
    this.score = null;
  }

  init() {
    this.levelSwither = new LevelSwitch();
    this.score = new Score();
    return this;
  }

  getElement() {
    const statusBarElement = createElement('div', 'status-bar');
    statusBarElement.append(this.levelSwither.getElement());
    statusBarElement.append(this.score.getElement());
    return statusBarElement;
  }
}
