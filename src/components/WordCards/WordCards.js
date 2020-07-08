import React from 'react';
import './WordCards.css';

const URL = "https://raw.githubusercontent.com/alexeikravchuk/rslang-data/master/";

class WordCards extends React.Component {

  constructor(props){
    super(props);
    this.audio = null;
    this.state = {
      lastNumber: 20,
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
      meaningTranslate: "перевод значения",
      exampleTranslate: "перевод примера",
      audioWord: "озвучка слова",
      audioMeaning: "озвучка значения",
      audioExampleWord: "озвучка примера",
    }
    this.playAudioWords = this.playAudioWords.bind(this);
    this.setCountPlus = this.setCountPlus.bind(this);
    this.handleChange = this.handleChange.bind(this); // bind handleChange function to this. Go to line 156, to see how it works
    // this.setCountMinus = this.setCountMinus.bind(this) 
  }

  componentDidMount() {
    this.getWords(0, 0).then((data)=>{
      this.getNewWords(data, this.state.counter)
      this.setState({dataRandom: data}) // here we need to update dataRandom,because in getNewWords function we need this array
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
      value: ""
    })
  }


  setCountMinus (){   
    this.clearInput()
    if (this.state.counter === 0) {
      this.setState({
        counter: 0,
      },() => { // after updating state we need to call getNewWords immediately, because setState works in an in an asynchronous way
        this.getNewWords(this.state.dataRandom, this.state.counter) // function getNewWords takes dataRandom from state (see line 39) and runs with 0, as second param. Goes to line 97 
    })
  } else{
    this.setState({
      counter: this.state.counter - 1
    },() => { // similar to line 68
      this.getNewWords(this.state.dataRandom, this.state.counter) // function getNewWords takes dataRandom from state (see line 39) and runs with incremented counter value, as second param. Goes to line 97 
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
  
  getNewWords = (dataRandom, counter) => {
    let currentObj = dataRandom[counter]; // here counter represent index in dataRandom array and serves as page number
    this.setState({
      translation: currentObj.wordTranslate, 
      transcription: currentObj.transcription,
      word: currentObj.word,
      image: `${URL}${currentObj.image}`,
      meaning: currentObj.textMeaning,
      example: currentObj.textExample,
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
    // this.playAudioWords(audioWord);
  }

  handleChange(event) { //create handleChange function, it update value state (line 16) with inputed text. This function need to be bind to this, other way in will not work. See line 32. 
    this.setState({value: event.target.value});
  }
  // ()=>{this.getNewWords(this.state.dataRandom, 0)}
  render(){
    let wordLength = "alcohol".length;
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
                <div className="meaning">{this.state.meaning}<span onClick={()=>{this.playAudioWords(this.state.audioMeaning)}} className="spell">🕬</span></div>
                <div className="example">{this.state.example}<span onClick={()=>{this.playAudioWords(this.state.audioExample)}}  className="spell">🕬</span></div>
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
