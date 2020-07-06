import React from 'react';
import './WordCards.css';

class WordCards extends React.Component {

  constructor(props){
    super(props);
    this.audio = null;
    this.state = {
      // previousPage: [],
      dataRandom: [],
      category: 1,
      count: 0,
      dropdown: false,
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
  }

  componentDidMount(){
    this.getWords(0, 0).then((data)=>{this.getNewWords(data, 0)});
  }

  async getWords(page, category){
    const response = await fetch (`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${category}`)
    const data = await response.json();
    let dataRandom = this.getShuffle(data);
    console.log(dataRandom);
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
  
  getNewWords = (dataRandom) => {
    const URL = "https://raw.githubusercontent.com/alexeikravchuk/rslang-data/master/";
    let currentObj = dataRandom[0];
    let previousArr = [];
    previousArr.push(currentObj);

console.log(previousArr);
    this.setState({
      // previousPage: previousArr,
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
      audioExample: `${URL}${currentObj.audioExample}`,
      dataRandom: dataRandom.slice(1)
    })

    // dataRandom = dataRandom.slice(1);
    // console.log(this.state.previousPage);
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

  render(){
    let wordLength = "alcohol".length;
    return (
      <div className="wrapper">
        <div className="word-cards">
          <div className="card-prev">
            <p /* onClick={()=>{this.getNewWords(this.state.previousPage)}} */ className="prev">⮜</p>
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
                      <input className="input" style={{width: `${wordLength * 12}px`}} type="text" maxLength={wordLength} autoComplete="off" autoFocus/>
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
            <p onClick={()=>{this.getNewWords(this.state.dataRandom)}} className="next">⮞</p>
          </div>
        </div>
        <div className="notification">Уведомления</div>
        <div className="stage">
          <div className="number-start">0</div>
          <div className="number-progress">
            <div className="progress-bar" style={{width: "2%"}}></div>
          </div>
          <div className="number-end">10</div>
        </div>
    </div>
    )
  }
}
  
export default WordCards;
