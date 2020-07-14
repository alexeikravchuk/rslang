import React from 'react';
import './WordCards.css';
import { URL, cardInfo, wordRequestURL, maxPage, maxCategory } from './constants';
import { LinearProgress } from '@material-ui/core';
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import { getSettings } from '../../store/actions/appSettingsAction';
import { connect } from 'react-redux';

class WordCards extends React.Component {
  constructor(props) {
    super(props);
    this.audio = null;

    this.id = props.userId;
    this.token = props.token;
    
    this.state = {
      dataRandom: [],
      learning: [],
      compound: [],
      deleted: [],
      category: 1,
      counter: 0,
      value: '',
      colorDots: 'white',
      showAnswer: false,
      valuePage: 0,
      valueCategory: 0,
      dropdown: false,
      notification: '',
      description: 'Success rate',
      translation: cardInfo.translation,
      transcription: cardInfo.transcription,
      word: cardInfo.word,
      image: cardInfo.image,
      meaning: cardInfo.meaning,
      example: cardInfo.example,
      meaningTranslate: cardInfo.meaningTranslate,
      exampleTranslate: cardInfo.exampleTranslate,
      audioWord: cardInfo.audioWord,
      audioMeaning: cardInfo.audioMeaning,
      audioExampleWord: cardInfo.audioExampleWord,
      meaningHide: '',
      exampleHide: '',
      showMeaning: false,
      showExample: false,
      progress: 0,
    };
    this.playAudioWords = this.playAudioWords.bind(this);
    this.setCountPlus = this.setCountPlus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showMeaningWord = this.showMeaningWord.bind(this);
    this.showExampleWord = this.showExampleWord.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }

  generateWords(page, category) {
    this.getWords(page, category).then((data) => {
      this.getNewWords(data[this.state.counter]);
      this.setState({ dataRandom: data });
    });
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getSettings(this.id, this.token));
  }

  componentDidMount() {
    this.generateWords(0, 0);
  }

  async getWords(page, category) {
    const response = await fetch(`${wordRequestURL}?page=${page}&group=${category}`);
    const data = await response.json();
    let dataRandom = this.getShuffle(data);
    return dataRandom;
  }

  getShuffle(array) {
    let m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  clearInput() {
    this.setState({
      value: '',
      showMeaning: false,
      showExample: false,
    });
  }

  setCountMinus() {
    this.clearInput();
    if (this.state.counter === 0) {
      this.setState(
        {
          counter: 0,
          progress: 0,
        },
        () => {
          this.getNewWords(this.state.dataRandom[this.state.counter]);
        }
      );
    } else {
      this.setState({ progress: this.state.progress - 10 });
      this.setState(
        {
          counter: this.state.counter - 1,
          progress: this.state.progress - 100 / this.state.lastNumber,
        },
        () => {
          this.getNewWords(this.state.dataRandom[this.state.counter]);
        }
      );
    }
  }

  setCountPlus = () => {
    this.clearInput();
    this.setState({ colorDots: 'white' });
    this.setState({ description: 'Success rate' })
    if (this.state.counter === this.state.lastNumber - 1) {
      this.setState(
        {
          counter: this.state.lastNumber - 1,
          progress: 100,
        },
        () => {
          this.setState({
            notification: 'Day plan is completed!',
          });
          this.getNewWords(this.state.dataRandom[this.state.counter]);
        }
      );
    } else {
      this.setState(
        {
          counter: this.state.counter + 1,
          progress: this.state.progress + 100 / this.state.lastNumber,
        },
        () => {
          this.getNewWords(this.state.dataRandom[this.state.counter]);
        }
      );
    }
  };

  removeTags = (seq, tag) => {
    let tagged = seq.match(new RegExp('(<' + tag + '>(.*?)</' + tag + '>)', 'g')).toString();
    let word = tagged.substr(3, tagged.length - 7);
    let hidden = seq.replace(tagged, 'CLICK');
    if (tag === 'i') {
      this.setState({
        meaningHide: hidden,
      });
    } else {
      this.setState({
        exampleHide: hidden,
      });
    }
    seq = seq.replace(tagged, word);
    return seq;
  };

  getNewWords = (currentObj) => {
    this.setState({
      translation: currentObj.wordTranslate,
      transcription: currentObj.transcription,
      word: currentObj.word,
      image: `${URL}${currentObj.image}`,
      meaning: this.removeTags(currentObj.textMeaning, 'i'),
      example: this.removeTags(currentObj.textExample, 'b'),
      meaningTranslate: currentObj.textMeaningTranslate,
      exampleTranslate: currentObj.textExampleTranslate,
      audioWord: `${URL}${currentObj.audio}`,
      audioMeaning: `${URL}${currentObj.audioMeaning}`,
      audioExample: `${URL}${currentObj.audioExample}`,
    });
  };

  playAudioWords(audioSrc) {
    if (!this.audio) {
      this.audio = new Audio(audioSrc);
      this.audio.play();
      this.audio.addEventListener('ended', () => {
        this.audio = null;
      });
    }
  }

  toggleDropdown() {
    const { dropdown } = this.state;
    this.setState({
      dropdown: !dropdown,
    });
  }

  getAnswer() {
    this.setState({
      value: this.state.word,
      showMeaning: true,
      showExample: true,
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.setState({ showAnswer: false });
    if (event.target.value.length === this.state.word.length) {
      let resultInputWord = this.checkAnswer(event.target.value, this.state.word);
      resultInputWord = resultInputWord.map(item => item.props.className);
      let errorCount = 0;
      for (var i = 0; i < resultInputWord.length; ++i) {
        if (resultInputWord[i] === "word-error")
          errorCount++;
      }
      if (errorCount === 0) {
        this.setState({ colorDots: 'green' });
        this.setState({ description: 'Great :)' });
      } else if ((resultInputWord.length / errorCount) < 2) {
        this.setState({ colorDots: 'red' });
        this.setState({ description: 'Try again !' });
      } else if ((resultInputWord.length / errorCount) > 2) {
        this.setState({ colorDots: 'orange' });
        this.setState({ description: 'Almost ...' });
      }
      this.checkAnswer(event.target.value, this.state.word);
      this.setState({ showAnswer: true })
    } else {
      this.setState({ showAnswer: false })
      this.setState({ colorDots: 'white' });
      this.setState({ description: 'Success rate' })
    }
  }

  checkAnswer(input, word) {
    let answer = [];
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== word[i]) {
        answer.push(<span className='word-error' key={i}>{input[i]}</span>);
      }
      else {
        answer.push(<span className='word-correct' key={i}>{input[i]}</span>);
      }
    }
    return answer;
  }

  handleChangePage(event) {
    this.setState({ valuePage: event.target.value }, () => {
      this.generateWords(this.state.valuePage, this.state.valueCategory);
    });
  }

  handleChangeCategory(event) {
    this.setState({ valueCategory: event.target.value - 1 }, () => {
      this.generateWords(this.state.valuePage, this.state.valueCategory);
    });
  }

  showMeaningWord() {
    this.setState((state) => ({
      showMeaning: !state.showMeaning,
    }));
  }

  showExampleWord() {
    this.setState((state) => ({
      showExample: !state.showExample,
    }));
  }

  createLearningWords() {
    this.setState(
      {
        learning: this.state.learning.concat([this.state.word]),
      },
      () => {
        this.toggleDropdown();
        console.log(this.state.learning); 
        let uniqueLearningCollection = [...new Set(this.state.learning)];
        console.log(uniqueLearningCollection); //need to be pushed to the store
      }
    );
  }

  createCompoundWords() {
    this.setState(
      {
        compound: this.state.compound.concat(this.state.word),
      },
      () => {
        this.toggleDropdown();
        console.log(this.state.compound);
        let uniqueCompoundCollection = [...new Set(this.state.compound)];
        console.log(uniqueCompoundCollection); //need to be pushed to the store
      }
    );
  }

  createDeletedWords() {
    this.setState(
      {
        deleted: this.state.deleted.concat([this.state.word]),
      },
      () => {
        this.toggleDropdown();
        console.log(this.state.deleted); 
        let uniqueDeletedCollection = [...new Set(this.state.deleted)];
        console.log(uniqueDeletedCollection); //need to be pushed to the store
      }
    );
  }

  selectPage(array) {
    let newArr = new Array(array)
      .fill(1)
      .map((item, i) => <option key={`page-${i}`}>{item + i}</option>);
    return newArr;
  }

  render() {
    const { data } = this.props;
    console.log(data); // дефолтный стейт настроек
    let wordLength = this.state.word.length;
    const {
      translation,
      transcription,
      value,
      meaningTranslate,
      exampleTranslate,
      notification,
      progress,
      showMeaning,
      showExample,
      meaning,
      example,
      meaningHide,
      exampleHide,
      audioWord,
      valuePage,
      valueCategory,
      dropdown,
      audioMeaning,
      audioExample,
      image,
    } = this.state;
    return (
      <div className='learning-card-wrapper'>
        <div className='learning-word-cards'>
          <div className='learning-card-prev'>
            <ArrowBackIosTwoToneIcon onClick={() => this.setCountMinus()} className='prev'>
              ⮜
            </ArrowBackIosTwoToneIcon>
          </div>
          <div className='learning-card'>
            <div className='learning-card-header'>
              <div className='current-word'>
                <div style={{ color: this.state.colorDots }} >
                  <span>&#10687;</span>
                  <span>&#10687;</span>
                  <span>&#10687;</span>
                  <span>&#10687;</span>
                  <span>&#10687;</span>
                </div>
                <div className='learning-word-description'>
                  <span>{this.state.description}</span>
                </div>
                <form className='select-learning-page'>
                  Page:
                  <br />
                  <select value={valuePage} onChange={this.handleChangePage} name='page'>
                    {this.selectPage(maxPage)}
                  </select>
                </form>
                <form
                  value={valueCategory}
                  onChange={this.handleChangeCategory}
                  className='select-learning-category'>
                  Category:
                  <br />
                  <select name='category'>{this.selectPage(maxCategory)}</select>
                </form>
              </div>
              <div className='dropdown-notes'>
                <div className='dropdown' style={{ display: dropdown ? 'block' : 'none' }}>
                  <div
                    onClick={() => {
                      this.createLearningWords();
                    }}
                    className='learning'>
                    Add to Learning Words
                  </div>
                  <div
                    onClick={() => {
                      this.createCompoundWords();
                    }}
                    className='compound'>
                    Mark as Compound Word
                  </div>
                  <div
                    onClick={() => {
                      this.createDeletedWords();
                    }}
                    className='deleted'>
                    Remove from word list
                  </div>
                </div>
                <div className='word-notes'>
                  <span
                    onClick={() => {
                      this.toggleDropdown();
                    }}>
                    ⚑
                  </span>
                </div>
              </div>
            </div>
            <div className='learning-card-main'>
              <div className='learning-word-wrapper'>
                <div className='learning-word-info'>
                  <div className='learning-word-translation'>
                    {translation}
                    <span
                      onClick={() => {
                        this.playAudioWords(audioWord);
                      }}
                      className='spell'>
                      🕬
                    </span>
                  </div>
                  <div className='learning-word-transcription'>{transcription}</div>
                  <div className='learning-word-input'>
                    <div className="learning-check-input">
                      <input
                        id='input'
                        value={value}
                        onChange={this.handleChange}
                        className='word-answer-input'
                        style={{ width: `${wordLength * 16}px` }}
                        type='text'
                        maxLength={wordLength}
                        autoComplete='off'
                        autoFocus
                      />
                      <div className="check-input">{this.state.showAnswer ? this.checkAnswer(this.state.value, this.state.word) : null}</div>
                    </div>
                  </div>
                </div>
                <img className='learning-word-image' src={image} alt='' />
              </div>
              <div className='learning-word-examples'>
                <div className='learning-word-meaning'>
                  <div className='meaning-sentence' onClick={this.showMeaningWord}>
                    {showMeaning ? meaning : meaningHide}
                  </div>
                  <span
                    onClick={() => {
                      this.playAudioWords(audioMeaning);
                    }}
                    className='spell'>
                    🕬
                  </span>
                </div>
                <div className='learning-word-example'>
                  <div className='example-sentence' onClick={this.showExampleWord}>
                    {showExample ? example : exampleHide}
                  </div>
                  <span
                    onClick={() => {
                      this.playAudioWords(audioExample);
                    }}
                    className='spell'>
                    🕬
                  </span>
                </div>
                <div className='meaning-translate'>{meaningTranslate}</div>
                <div className='example-translate'>{exampleTranslate}</div>
              </div>
            </div>
          </div>
          <div className='learning-card-next'>
            <ArrowForwardIosTwoToneIcon onClick={() => this.setCountPlus()} className='next'>
              ⮞
            </ArrowForwardIosTwoToneIcon>
          </div>
        </div>
        <div className='button-reactions'>
          <div
            onClick={() => {
              this.getAnswer();
            }}
            className='learning-word-button-show'>
            Show answer
          </div>
          <div onClick={() => this.setCountPlus()} className='learning-word-button-check'>
            Next card
          </div>
        </div>
        <div className='learning-word-notification'>{notification}</div>
        <div className='learning-word-stage'>
          <div className='number-start'>0</div>
          <div className='number-progress'>
            <LinearProgress variant='determinate' value={progress} />
          </div>
          <div className='number-end'>{data.wordsPerDay}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { appStateReducer } = state;
  return {
    data: appStateReducer.data,
  };
};

export default connect(mapStateToProps)(WordCards);
