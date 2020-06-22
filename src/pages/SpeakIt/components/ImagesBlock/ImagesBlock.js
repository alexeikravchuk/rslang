import { createElement } from '../utility';
import { START_IMG_LINK } from '../constants';

export default class ImagesBlock {
  constructor() {
    this.img = null;
    this.translation = null;
    this.audioInput = null;
    this.isGameActive = false;
  }

  getElement() {
    return this.buildElement();
  }

  buildElement() {
    const element = createElement('div', 'images');

    this.img = createElement('img', 'img');
    this.img.src = START_IMG_LINK;

    this.translation = createElement('p', 'translation');
    this.translation.innerText = '';

    this.audioInput = createElement('input', 'input', 'none');
    this.audioInput.type = 'text';
    this.audioInput.readOnly = true;

    if (this.isGameActive) {
      this.translation.classList.add('none');
      this.translation.classList.remove('none');
    }

    element.append(this.img);
    element.append(this.translation);
    element.append(this.audioInput);
    return element;
  }

  reset() {
    this.img.src = START_IMG_LINK;
    this.translation.innerText = '';
    this.audioInput.value = '';
  }
}
