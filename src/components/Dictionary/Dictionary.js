import React from 'react';
import './Dictionary.css';

class Dictionary extends React.Component {
  
  constructor(props){
    super(props);
    this.audio = null;
    this.state = {
      content: 'Please select a category',
      category: 1,
      count: 0,
    }
  }

  componentDidMount() {
    document.title = `Results page ${this.state.count}`;
  }
  componentDidUpdate() {
    document.title = `Results page ${this.state.count}`;
  }

  playAudioWords(audioSrc) {
    if (!this.audio) {
      this.audio = new Audio(audioSrc);
      this.audio.play();
      this.audio.addEventListener('ended', () => { this.audio = null; });
      console.log(audioSrc);
    }
  }

  async getWords(page, category){
    const response = await fetch (`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${category}`)
    const data = await response.json();
    return data;
  }

  newWords = (data, category) => {
    let words = []
    let transcriptions = []
    let translations = []
    let audios = []
    data.forEach(item => {
      words.push(item.word)
      transcriptions.push(item.transcription)
      translations.push(item.wordTranslate)
      audios.push(item.audio)
    })
    words = words.map((item, index) => 
    <div><span> {item} </span><span className="transcription"> {transcriptions[index]} </span><span> {translations[index]} </span><button onClick={()=>{this.playAudioWords(`https://raw.githubusercontent.com/alexeikravchuk/rslang-data/master/${audios[index]}`)}}>Spell IT</button></div>)
    this.setState({
      content: words,
      category: category,
      count: 1
    });
  };

  nextWords = (data, counter) => {
    if(this.state.count < 1){
      this.setState({
        count: 0
      });
    }
    else if (this.state.count < 30) {
      let words = []
      let transcriptions = []
      let translations = []
      let audios = []
      data.forEach(item => {
        words.push(item.word)
        transcriptions.push(item.transcription)
        translations.push(item.wordTranslate)
        audios.push(item.audio)
      })
      words = words.map((item, index) => 
      <div><span> {item} </span><span className="transcription"> {transcriptions[index]} </span><span> {translations[index]} </span><button onClick={()=>{this.playAudioWords(`https://raw.githubusercontent.com/alexeikravchuk/rslang-data/master/${audios[index]}`)}}>Spell IT</button></div>)
      this.setState({
        content: words,
        count: counter + 1
      });
    }
    else {
      this.setState({
        count: 30
      });
    }
  };  
 
  render(){
    return (
      <div className ="wrapper">
        <h2>Word Categories</h2>
        <p className="select-category"><i>Select a category</i></p>
        <div className="category">
          <a onClick={()=>this.getWords(0, 0).then((data)=>{this.newWords(data, 0)})} href="#anchor">category1</a>
          <a onClick={()=>this.getWords(0, 1).then((data)=>{this.newWords(data, 1)})} href="#anchor">category2</a>
          <a onClick={()=>this.getWords(0, 2).then((data)=>{this.newWords(data, 2)})} href="#anchor">category3</a>
          <a onClick={()=>this.getWords(0, 3).then((data)=>{this.newWords(data, 3)})} href="#anchor">category4</a>
          <a onClick={()=>this.getWords(0, 4).then((data)=>{this.newWords(data, 4)})} href="#anchor">category5</a>
          <a onClick={()=>this.getWords(0, 5).then((data)=>{this.newWords(data, 5)})} href="#anchor">category6</a>
        </div>
        <h2 id="anchor">Essential english words</h2>
        <div className="dictionaryPage">{this.state.content}</div>
        <button className="show">
          <a onClick={()=>this.getWords(this.state.count, this.state.category).then((data)=>{this.nextWords(data, this.state.count)})}className="more" href="#anchor">Show more words</a>
        </button>
        <p className="page">Results page {this.state.count}</p>
      </div>
    )
  }
}
  
export default Dictionary;
