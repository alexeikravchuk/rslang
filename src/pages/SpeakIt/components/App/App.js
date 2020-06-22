import Intro from '../Intro/Intro';
import MainPage from '../MainPage/MainPage';
import Controller from '../Controller/Controller';
import Results from '../Results/Results';

export default class App {
  constructor(container) {
    this.container = container;
    this.state = null;
  }

  start() {
    new Intro().render(this.container);
    this.mainPage = new MainPage().init();
    this.mainPage.render(this.container);
    this.results = new Results();
    this.results.render(this.container);
    this.contoller = new Controller(this.mainPage, this.results);
  }
}
