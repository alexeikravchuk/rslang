import React from 'react';
// import sound from './sound.png';
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
      content: 'Please select a category'
    }
    // this.category = category
  }



  newWord = (category) => {
    let categoryFirst = category.slice(0, 19);
    let words = categoryFirst.map(el => el.word)
    let transcriptions = categoryFirst.map(el => el.transcription)
    let translations = categoryFirst.map(el => el.wordTranslate)
    words = words.map((item, index) => 
    <div><span> {item} </span><span> {transcriptions[index]} </span><span> {translations[index]} </span><button>Spell IT</button></div>)
    this.setState({
      content: words
    });
  };

  nextWord = (category) => {
    let categoryFirst = category.slice(20, 39);
    let words = categoryFirst.map(el => el.word)
    let transcriptions = categoryFirst.map(el => el.transcription)
    let translations = categoryFirst.map(el => el.wordTranslate)
    words = words.map((item, index) => 
    <div><span> {item} </span><span> {transcriptions[index]} </span><span> {translations[index]} </span><button>Spell IT</button></div>)
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
        <button className="show" onClick={()=>this.nextWord(Category1)}><a id="more" href="#anchor">Show more words</a></button>
      </div>
    )
  }
}
  
export default Dictionary;