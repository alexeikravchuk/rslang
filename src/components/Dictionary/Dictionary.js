import React from 'react';
// import './Dictionary.css';
import {URL} from './constants';
import {getWords} from './getWords.js';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import {ListItem, ListItemText} from '@material-ui/core';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

class Dictionary extends React.Component {

  constructor(props) {
    super(props);
    this.audio = null;
    this.state = {
      content: 'Please select a category',
      category: 0,
      count: 0,
      pageLoaded: true,
    };
  }

  handleCategoryChange(event, value) {
    this.setState(() => (
      {category: value - 1, count: 0}
    ), () => this.handleCategory(this.state.category));
  }

  handleCountChange(event, value) {
    this.setState(() => ({count: value - 1}), () => this.handleMoreWords());
  }

  componentDidMount() {
    document.title = `Results page ${this.state.count}`;
    this.handleCategory(this.state.category);
  }

  componentDidUpdate() {
    document.title = `Results page ${this.state.count}`;
  }

  playAudioWords(path) {
    let audio = new Audio(path);
    let audioPromise = audio.play();
    if (audioPromise !== undefined) {
      audioPromise.then(_ => {
        audio.pause();
      })
        .catch(error => {
          console.log(error);
        });
    }
  }

  getNextWords = (data) => {
    let words;
    let audios;
    data.forEach(item => {
      audios.push(item.audio);
    });
    words = data.map((el, index) => {
      return (
        <ListItem key={index}>
          <ListItemText
            primary={`${index + 1}. ${el.word} - ${el.transcription} - ${el.wordTranslate}`}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end"
                        onClick={() => {
                          this.playAudioWords(`${URL}${audios[index]}`);
                        }}>
              <RecordVoiceOverIcon/>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    this.setState({content: words});
  };

  handleCategory = (categoryNumber) => {
    getWords(0, categoryNumber).then((data) => {
      this.getNextWords(data, categoryNumber);
    });
  };

  handleMoreWords = () => {
    this.setState({pageLoaded: true});
    getWords(this.state.count, this.state.category).then((data) => {
      this.setState({pageLoaded: true});
      this.getNextWords(data, this.state.count);
    });
  };

  render() {
    return (
      <Container>
        <Typography variant="h4" component="h2">
          Dictionary
        </Typography>
        <p className="select-category"><i>Category: </i></p>
        <Pagination count={6} size="medium" onChange={this.handleCategoryChange.bind(this)}/>
        <List dense={true}> {this.state.content}</List>
        {this.state.pageLoaded && <Pagination count={30}
                                              size="medium"
                                              onChange={this.handleCountChange.bind(this)}/>}
      </Container>
    );
  }
}

export default Dictionary;
