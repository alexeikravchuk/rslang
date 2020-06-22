import React from 'react';
import './Dictionary.css';
import Category1 from './Category1.js';
import Category2 from './Category2.js';
import Category3 from './Category3.js';
import Category4 from './Category4.js';
import Category5 from './Category5.js';
import Category6 from './Category6.js';

class Dictionary extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      content: 'Please select a category',
      category: 1,
      count: 0
    }
  }

  componentDidMount() {
    document.title = `Results page ${this.state.count}`;
  }
  componentDidUpdate() {
    document.title = `Results page ${this.state.count}`;
  }

  audioWords(audioSrc) {
    const audio = new Audio(audioSrc);
    audio.play();
  }

  newWord = (category) => {
    let categoryWords = category.slice(0, 19)
    let words = categoryWords.map(el => el.word)
    let transcriptions = categoryWords.map(el => el.transcription)
    let translations = categoryWords.map(el => el.wordTranslate)
    let audios = categoryWords.map(el => el.audio)
    words = words.map((item, index) => 
    <div><span> {item} </span><span> {transcriptions[index]} </span><span> {translations[index]} </span><button onClick={()=>{this.audioWords(`https://raw.githubusercontent.com/alexeikravchuk/rslang-data/master/${audios[index]}`)}}>Spell IT</button></div>)
    this.setState({
      content: words,
      category: category,
      count: 1
    });
  };

  nextWord = (category, counter) => {
    let categoryWords = category.slice((counter) * 20, (counter + 1) * 20 - 1)
    // if (0 < counter < 30) {
    //   кнопка не нажимайся;
    // }
    let words = categoryWords.map(el => el.word)
    let transcriptions = categoryWords.map(el => el.transcription)
    let translations = categoryWords.map(el => el.wordTranslate)
    let audios = categoryWords.map(el => el.audio)
    words = words.map((item, index) => 
    <div><span> {item} </span><span> {transcriptions[index]} </span><span> {translations[index]} </span><button onClick={()=>{this.audioWords(`https://raw.githubusercontent.com/alexeikravchuk/rslang-data/master/${audios[index]}`)}}>Spell IT</button></div>)
    this.setState({
      content: words
    });
  };  
 
  render(){
    return (
      <div id="wrapper">
        <h2>Word Categories</h2>
        <p className="select-category"><i>Select a category</i></p>
        <div id="category">
          <a onClick={()=>this.newWord(Category1)} href="#anchor">category1</a>
          <a onClick={()=>this.newWord(Category2)} href="#anchor">category2</a>
          <a onClick={()=>this.newWord(Category3)} href="#anchor">category3</a>
          <a onClick={()=>this.newWord(Category4)} href="#anchor">category4</a>
          <a onClick={()=>this.newWord(Category5)} href="#anchor">category5</a>
          <a onClick={()=>this.newWord(Category6)} href="#anchor">category6</a>
        </div>
        <h2 id="anchor">Essential english words</h2>
        <div id="dictionaryPage">{this.state.content}</div>
        <button className="show">
          <p onClick={() => this.setState({ count: this.state.count + 1 })}>
            <a onClick={()=>this.nextWord(this.state.category, this.state.count)} id="more" href="#anchor">Show more words</a>
          </p>
        </button>
        <p className="page">Results page {this.state.count}</p>
      </div>
    )
  }
}
  
export default Dictionary;