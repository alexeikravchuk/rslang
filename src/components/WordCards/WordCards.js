import React from 'react';
import './WordCards.css';

const URL = "https://raw.githubusercontent.com/alexeikravchuk/rslang-data/master/";

class WordCards extends React.Component {

  constructor(props){
    super(props);
    this.audio = null;
    this.state = {
      lastNumber: 30,
      dataRandom: [],
      category: 1,
      counter: 0,
      value: "",
      dropdown: false,
      notification: "",
      translation: "перевод",
      transcription: "транскрипция",
      word: "слово",
      image: "картинка",
      meaning: "значение",
      example: "пример",
      meaningHide: "", // here will be meaning sentence with word "Click", that hide word to learn 
      exampleHide: "", // here will be example sentence with word "Click", that hide word to learn
      showMeaning: false, // option, that will be toggled when user clicks on meaning sentence. Go to line 182 to see how it works  
      showExample: false, // option, that will be toggled when user clicks on example sentence.  
      meaningTranslate: "перевод значения",
      exampleTranslate: "перевод примера",
      audioWord: "озвучка слова",
      audioMeaning: "озвучка значения",
      audioExampleWord: "озвучка примера",
    }
    this.playAudioWords = this.playAudioWords.bind(this);
    this.setCountPlus = this.setCountPlus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showMeaningWord = this.showMeaningWord.bind(this);
    this.showExampleWord = this.showExampleWord.bind(this); 
    
  }

  componentDidMount() {
    this.getWords(0, 0).then((data)=>{
      this.getNewWords(data, this.state.counter)
      this.setState({dataRandom: data}) 
    });
  }
  componentDidUpdate() {
    document.title = `Word ${this.state.counter}`;
  }

  async getWords(page, category){
    const response = await fetch (`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${category}`)
    const data = await response.json();
    let dataRandom = this.getShuffle(data);
    return dataRandom;
  }

   getShuffle(array) {
    let m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  clearInput(){
    this.setState({
      value: "",
      showMeaning: false, // hide word, when user leaves card 
      showExample: false
    })
  }

  setCountMinus (){ 
    this.clearInput()
    if (this.state.counter === 0) {
      this.setState({
        counter: 0,
      },() => { 
        this.getNewWords(this.state.dataRandom, this.state.counter) 
      })
    } else{
      this.setState({
        counter: this.state.counter - 1
      },() => { 
        this.getNewWords(this.state.dataRandom, this.state.counter) 
      })
    }
  }

  setCountPlus = () => { 
    this.clearInput()
    if (this.state.counter === (this.state.lastNumber - 1)) {
      this.setState({
        counter: this.state.lastNumber - 1
      },() => {
        alert('Day plan is completed!')
        this.setState({
          notification: "Day plan is completed!"
        })
        this.getNewWords(this.state.dataRandom, this.state.counter)
      })
    } else {
      this.setState({
        counter: this.state.counter + 1
      },() => {
        this.getNewWords(this.state.dataRandom, this.state.counter)
      });
    }
  }
  
  removeTags = (seq, tag) => { // this is a show/hiding core. This function deals with tags, and construct sentence with hided word
    // eslint-disable-next-line
    let tagged = seq.match(new RegExp('(<'+tag+'>(.*?)<\/'+tag+'>)', 'g')).toString(); 
    let word = tagged.substr(3, tagged.length-7);
    let hidden = seq.replace(tagged, 'CLICK')
    if(tag === 'i'){
      this.setState({
        meaningHide: hidden
      })
    } else {
      this.setState({
        exampleHide: hidden
      })
    }
    seq = seq.replace(tagged, word);
    return seq 
  }

  getNewWords = (dataRandom, counter) => {
    let currentObj = dataRandom[counter]; 
  
    this.setState({
      translation: currentObj.wordTranslate, 
      transcription: currentObj.transcription,
      word: currentObj.word,
      image: `${URL}${currentObj.image}`,
      meaning: this.removeTags(currentObj.textMeaning, 'i'), // remove  tag <i> from sentence
      example: this.removeTags(currentObj.textExample, 'b'), // remove  tag <b> from sentence
      meaningTranslate: currentObj.textMeaningTranslate,
      exampleTranslate: currentObj.textExampleTranslate,
      audioWord: `${URL}${currentObj.audio}`,
      audioMeaning: `${URL}${currentObj.audioMeaning}`,
      audioExample: `${URL}${currentObj.audioExample}`
    })
  };

  playAudioWords(audioSrc) {
    if (!this.audio) {
      this.audio = new Audio(audioSrc);
      this.audio.play();
      this.audio.addEventListener('ended', () => { this.audio = null; });
    }
  }

  toggleDropdown() {
    if(this.state.dropdown === false){
      this.setState({
        dropdown: true
      });
    }
    if(this.state.dropdown === true){
      this.setState({
        dropdown: false
      });
    }
  }

  getAnswer() {
    this.setState({value: this.state.word})
  }

  handleChange(event) { 
    this.setState({value: event.target.value});
    if(this.state.value === this.state.word) {
      alert("Word are similar");
    } else {
      alert("Not similar");
    }
  }

  showMeaningWord(){ // this function toggled show/hide meaning option 
    this.setState(state => ({
      showMeaning: !state.showMeaning
    }));
  }

  showExampleWord(){ // this function toggled show/hide example option 
    this.setState(state => ({
      showExample: !state.showExample
    }));
  }
  
  render(){
    let wordLength = this.state.word.length;
    return (
      <div className="wrapper">
        <div className="word-cards">
          <div className="card-prev">
            <p onClick={()=>this.setCountMinus()} className="prev">⮜</p>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="current-word">
                <div className="dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="description">
                  <span>New word</span>
                </div>
                <form className="selectPage">Page:<br />
                  <select name="page">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                  </select>
                </form>
                <form className="selectCategory">Category:<br />
                  <select name="category">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                  </select>
                </form>
              </div>
              <div className="dropdown" style={{display: this.state.dropdown ? 'block' : 'none'}}>
                <div>Добавить в Изучаемые слова</div>
                <div>Пометить как Сложное слово</div>
                <div>Удалить из списка слов</div>
              </div>
              <div className="word-notes">
                <span onClick={()=>{this.toggleDropdown()}}>⚑</span>
              </div>
            </div>
            <div className="card-main">
              <div className="word-wrapper">
                <div className="word-info">
                  <div className="word-translation">{this.state.translation}<span onClick={()=>{this.playAudioWords(this.state.audioWord)}}  className="spell">🕬</span></div>
                    <div className="transcription">{this.state.transcription}</div>
                    <div className="input-word">
                      <input value={this.state.value} onChange={this.handleChange} className="input" style={{width: `${wordLength * 12}px`}} type="text" maxLength={wordLength} autoComplete="off" autoFocus />
                    </div>
                </div>
                <img className="word-image" src={this.state.image} alt="" />
              </div>
              <div className="word-examples">
                {/* content generated with ternary operator and shows sentence with actual word or with 'Click' word. See example on https://ru.reactjs.org/docs/handling-events.html*/}
                <div className="meaning"><div className="meaning-sentence" onClick={this.showMeaningWord}>{this.state.showMeaning ? this.state.meaning : this.state.meaningHide}</div><span onClick={()=>{this.playAudioWords(this.state.audioMeaning)}} className="spell">🕬</span></div>
                <div className="example"><div className="example-sentence" onClick={this.showExampleWord}>{this.state.showExample ? this.state.example : this.state.exampleHide}</div><span onClick={()=>{this.playAudioWords(this.state.audioExample)}}  className="spell">🕬</span></div>
                <div className="meaning-translate">{this.state.meaningTranslate}</div>
                <div className="example-translate">{this.state.exampleTranslate}</div>
              </div>
            </div>
          </div>
          <div className="card-next">
            <p onClick={()=>this.setCountPlus()} className="next">⮞</p>
          </div>
        </div>
        <div className="button-reactions">
          <div onClick={()=>{this.getAnswer()}} className="button-show">Показать ответ</div>
          <div onClick={()=>this.setCountPlus()} className="button-check">Дальше</div>
        </div>
        <div className="notification">{this.state.notification}</div>
        <div className="stage">
          <div className="number-start">0</div>
          <div className="number-progress">
            <div className="progress-bar" style={{width: "2%"}}></div>
          </div>
          <div className="number-end">{this.state.lastNumber}</div>
        </div>
    </div>
    )
  }
}
  
export default WordCards;
