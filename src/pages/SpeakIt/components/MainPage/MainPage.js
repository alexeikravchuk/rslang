import { createElement } from '../utility';
import StatusBar from '../StatusBar/StatusBar';
import ImagesBlock from '../ImagesBlock/ImagesBlock';
import CardList from '../CardList/CardList';

export default class MainPage {
  constructor() {
    this.statusBar = null;
    this.imagesBlock = null;
    this.cards = null;
    this.buttons = null;
  }

  init() {
    this.statusBar = new StatusBar().init();
    this.imagesBlock = new ImagesBlock();
    this.cards = new CardList().init();
    this.buildElement();
    return this;
  }

  buildElement() {
    this.pageElement = createElement('div', 'main-page', 'hidden');
    this.pageElement.append(this.statusBar.getElement());
    this.pageElement.append(this.imagesBlock.getElement());
    this.pageElement.append(this.cards.getElement());
    this.pageElement.append(MainPage.createButtons());
  }

  static createButtons() {
    const buttons = createElement('div', 'btns');
    buttons.insertAdjacentHTML('afterbegin', `
      <a href="#" class="btn restart">Restart</a>
      <a href="#" class="btn voice user-speach">Speak please</a>
      <a href="#" class="btn result">Results</a>
    `);
    return buttons;
  }

  render(container) {
    container.appendChild(this.pageElement);
  }
}
