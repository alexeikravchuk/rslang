import { WORD_REQUEST_URL } from "../../constants/urlsRequests";

const URL = 'https://raw.githubusercontent.com/alexeikravchuk/rslang-data/master/';
const wordRequestURL = WORD_REQUEST_URL;
const maxPage = 30;
const maxCategory = 6;
const cardInfo = {
  translation: 'перевод',
  transcription: 'транскрипция',
  word: 'слово',
  image: 'картинка',
  meaning: 'значение',
  example: 'пример',
  meaningTranslate: 'перевод значения',
  exampleTranslate: 'перевод примера',
  audioWord: 'озвучка слова',
  audioMeaning: 'озвучка значения',
  audioExampleWord: 'озвучка примера',
};

export { URL, cardInfo, wordRequestURL, maxPage, maxCategory };
