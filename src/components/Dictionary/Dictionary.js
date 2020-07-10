import React from 'react';
// import './Dictionary.css';
import {URL} from './constants';
import {getWords} from './getWords.js';
import Button from '@material-ui/core/Button';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';

class Dictionary extends React.Component {

  constructor(props) {
    super(props);
    this.audio = null;
    this.state = {
      content: 'Please select a category',
      category: 0,
      count: 0,
    };
  }

  handleChange(event, value) {
    this.setState(() => (
      {category: value - 1}
    ), () => this.handleCategory(this.state.category));
  }

  componentDidMount() {
    document.title = `Results page ${this.state.count}`;
    this.handleCategory(this.state.category);
  }

  componentDidUpdate() {
    document.title = `Results page ${this.state.count}`;
  }

  playAudioWords(audioSrc) {
    if (!this.audio) {
      this.audio = new Audio(audioSrc);
      this.audio.play();
      this.audio.addEventListener('ended', () => {
        this.audio = null;
      });
      console.log(audioSrc);
    }
  }

  getNewWords = (data, category) => {
    let words = [];
    let transcriptions = [];
    let translations = [];
    let audios = [];
    data.forEach(item => {
      words.push(item.word);
      transcriptions.push(item.transcription);
      translations.push(item.wordTranslate);
      audios.push(item.audio);
    });
    words = words.map((item, index) =>
      <div><span> {item} </span><span
        className="transcription"> {transcriptions[index]} </span><span> {translations[index]} </span>
        <Button
          startIcon={<RecordVoiceOverIcon/>}
          onClick={() => {
            this.playAudioWords(`${URL}${audios[index]}`);
          }}>
        </Button>
      </div>);
    this.setState({
      content: words,
      category: category,
      count: 1,
    });
  };

  getNextWords = (data, counter) => {
    // const URL = "https://raw.githubusercontent.com/alexeikravchuk/rslang-data/master/";
    if (this.state.count < 1) {
      this.setState({
        count: 0,
      });
    } else if (this.state.count < 30) {
      let words = [];
      let transcriptions = [];
      let translations = [];
      let audios = [];
      data.forEach(item => {
        words.push(item.word);
        transcriptions.push(item.transcription);
        translations.push(item.wordTranslate);
        audios.push(item.audio);
      });
      words = words.map((item, index) =>
        <div><span> {item} </span><span
          className="transcription"> {transcriptions[index]} </span><span> {translations[index]} </span>
          <Button
            startIcon={<RecordVoiceOverIcon/>}
            onClick={() => {
              this.playAudioWords(`${URL}${audios[index]}`);
            }}>
          </Button>
        </div>);
      this.setState({
        content: words,
        count: counter + 1,
      });
    } else {
      this.setState({
        count: 30,
      });
    }
  };

  handleCategory = (categoryNumber) => {
    getWords(0, categoryNumber).then((data) => {
      this.getNewWords(data, categoryNumber);
    });
  };

  handleMoreWords = () => {
    getWords(this.state.count, this.state.category).then((data) => {
      this.getNextWords(data, this.state.count);
    });
  };

  render() {
    return (
      <div className="wrapper">
        <Container>
          <Typography variant="h4" component="h2">
            Dictionary
          </Typography>
          <p className="select-category"><i>Category: </i></p>
          <Pagination count={6} size="medium" onChange={this.handleChange.bind(this)}/>
          {/*<h2 id="anchor">Essential english words</h2>*/}
          <div className="dictionaryPage">{this.state.content}</div>
          <Button variant={'outlined'}
                  color={'primary'}
                  onClick={() => this.handleMoreWords()}>
            Show more word
          </Button>
          <p className="page">Results page {this.state.count}</p>
        </Container>

      </div>
    );
  }
}

export default Dictionary;
