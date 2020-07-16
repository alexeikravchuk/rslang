import React from 'react';
import './WordCards.scss';
import {
  URL,
  cardInfo,
  wordRequestURL,
  maxPage,
  maxCategory,
  DOTS_COLOR,
  RESULTS_DESCRIPTION,
  LETTER_CLASS,
  NOTIFICATION,
} from './constants';
import { LinearProgress, Button } from '@material-ui/core';
import { ArrowForwardIos, ArrowBackIos, VolumeUp, Flag } from '@material-ui/icons';
import disabled from '../../assets/disabled.jpg';
import cardground from '../../assets/cardground.JPG';
import { getSettings } from '../../store/actions/appSettingsAction';
import { connect } from 'react-redux';

class WordCards extends React.Component {
  constructor(props) {
    super(props);
    this.audio = null;

    const { dispatch, userId, token } = this.props;
    dispatch(getSettings(userId, token));
    const { data } = this.props;

    this.state = {
      dataRandom: [],
      learning: [],
      compound: [],
      deleted: [],
      category: 1,
      counter: 0,
      value: '',
      colorDots: DOTS_COLOR.white,
      showAnswer: false,
      valuePage: 0,
      valueCategory: 0,
      dropdown: false,
      notification: '',
      lastNumber: data.wordsPerDay,
      description: RESULTS_DESCRIPTION.success,
      translation: cardInfo.translation,
      transcription: cardInfo.transcription,
      id: cardInfo.id,
      word: cardInfo.word,
      image: cardInfo.image,
      meaning: cardInfo.meaning,
      example: cardInfo.example,
      translateMeaningShow: false,
      translateExampleShow: false,
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
  }

  generateWords = (page, category) => {
    this.getWords(page, category).then((data) => {
      this.getNewWords(data[this.state.counter]);
      this.setState({ dataRandom: data });
    });
  };

  componentDidMount = () => {
    this.generateWords(0, 0);
  };

  getWords = async (page, category) => {
    const response = await fetch(`${wordRequestURL}?page=${page}&group=${category}`);
    const data = await response.json();
    let dataRandom = this.getShuffle(data);
    return dataRandom;
  };

  getShuffle = (array) => {
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
  };

  clearInput = () => {
    this.setState({
      value: '',
      showMeaning: false,
      showExample: false,
    });
  };

  setCountMinus = () => {
    const { counter, progress, lastNumber, dataRandom } = this.state;
    this.clearInput();
    if (counter) {
      return this.setState(
        {
          counter: counter - 1,
          progress: progress - 100 / lastNumber,
        },
        () => this.getNewWords(dataRandom[counter])
      );
    }
    return this.setState({ progress: 0 }, () => this.getNewWords(dataRandom[counter]));
  };

  setCountPlus = () => {
    const { counter, progress, lastNumber, dataRandom } = this.state;
    this.clearInput();
    this.setState({ colorDots: DOTS_COLOR.white, description: RESULTS_DESCRIPTION.success });
    if (counter === lastNumber - 1) {
      return this.setState(
        {
          counter: lastNumber - 1,
          progress: 100,
        },
        () => {
          this.setState({
            notification: NOTIFICATION,
          });
          this.getNewWords(dataRandom[counter]);
        }
      );
    }
    return this.setState(
      {
        counter: counter + 1,
        progress: progress + 100 / lastNumber,
      },
      () => this.getNewWords(dataRandom[counter])
    );
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
      id: currentObj.id,
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

  playAudioWords = (audioSrc) => {
    if (!this.audio) {
      this.audio = new Audio(audioSrc);
      this.audio.play().catch((e) => console.log(e.message));
      this.audio.addEventListener('ended', () => {
        this.audio = null;
      });
    }
  };

  toggleDropdown = () => {
    const { dropdown } = this.state;
    this.setState({
      dropdown: !dropdown,
    });
  };

  getAnswer = () => {
    const { learning, word, id } = this.state;
    this.setState({
      value: this.state.word,
      showMeaning: true,
      showExample: true,
      learning: learning.concat([{ word: word, id: id }]),
    });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value, showAnswer: false });
    const { learning, word, id } = this.state;
    if (value.length === word.length) {
      let resultInputWord = this.checkAnswer(value, word);
      resultInputWord = resultInputWord.map((item) => item.props.className);
      let errorCount = 0;
      for (var i = 0; i < resultInputWord.length; ++i) {
        if (resultInputWord[i] === LETTER_CLASS.error) errorCount++;
      }
      if (!errorCount) {
        this.setState({
          colorDots: DOTS_COLOR.green,
          description: RESULTS_DESCRIPTION.great,
          translateMeaningShow: true,
          translateExampleShow: true,
        });
      } else if (resultInputWord.length / errorCount < 2) {
        this.setState({
          colorDots: DOTS_COLOR.red,
          description: RESULTS_DESCRIPTION.tryAgain,
          learning: learning.concat([{ word: word, id: id }]),
        });
      } else if (resultInputWord.length / errorCount > 2) {
        this.setState({
          colorDots: DOTS_COLOR.orange,
          description: RESULTS_DESCRIPTION.almost,
          learning: learning.concat([{ word: word, id: id }]),
        });
      }
      this.checkAnswer(value, word);
      this.setState({ showAnswer: true });
    } else {
      this.setState({
        showAnswer: false,
        translateMeaningShow: false,
        translateExampleShow: false,
        colorDots: DOTS_COLOR.white,
        description: RESULTS_DESCRIPTION.success,
      });
    }
  };

  checkAnswer = (input, word) => {
    return input.split('').map((letter, i) => (
      <span className={letter === word[i] ? LETTER_CLASS.correct : LETTER_CLASS.error} key={i}>
        {letter}
      </span>
    ));
  };

  handleChangePage = ({ target }) => {
    const { valuePage, valueCategory } = this.state;
    this.setState({ valuePage: target.value }, () => this.generateWords(valuePage, valueCategory));
  };

  handleChangeCategory = ({ target }) => {
    const { valuePage, valueCategory } = this.state;
    this.setState({ valueCategory: target.value - 1 }, () =>
      this.generateWords(valuePage, valueCategory)
    );
  };

  showMeaningWord = () => {
    this.setState((state) => ({
      showMeaning: !state.showMeaning,
    }));
  };

  showExampleWord = () => {
    this.setState((state) => ({
      showExample: !state.showExample,
    }));
  };

  createLearningWords = () => {
    const { learning, word, id } = this.state;
    this.setState(
      {
        learning: learning.concat([{ word: word, id: id }]), //uniq need to be pushed to the store
      },
      () => {
        this.toggleDropdown();
        // let uniqueLearningCollection = [...new Set(learning)];
        // console.log(uniqueLearningCollection);
      }
    );
  };

  createCompoundWords = () => {
    const { compound, word, id } = this.state;
    this.setState(
      {
        compound: compound.concat([{ word: word, id: id }]), //uniq need to be pushed to the store
      },
      () => {
        this.toggleDropdown();
        // let uniqueCompoundCollection = [...new Set(compound)];
        // console.log(uniqueCompoundCollection);
      }
    );
  };

  createDeletedWords = () => {
    const { deleted, word, id } = this.state;
    this.setState(
      {
        deleted: deleted.concat([{ word: word, id: id }]), //uniq need to be pushed to the store
      },
      () => {
        this.toggleDropdown();
        // let uniqueDeletedCollection = [...new Set(deleted)];
        // console.log(uniqueDeletedCollection);
      }
    );
  };

  selectPage = (array) => {
    let newArr = new Array(array)
      .fill(1)
      .map((item, i) => <option key={`page-${i}`}>{item + i}</option>);
    return newArr;
  };

  render() {
    const { data } = this.props;
    const {
      word,
      translation,
      transcription,
      value,
      meaningTranslate,
      exampleTranslate,
      notification,
      progress,
      translateMeaningShow,
      translateExampleShow,
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
      colorDots,
      description,
      showAnswer,
    } = this.state;
    let wordLength = word.length;
    return (
      <div
        className='learning-card-wrapper'
        style={{ background: `url(${cardground}) no-repeat`, backgroundSize: '100% 100%' }}>
        <div className='learning-word-cards'>
          <div className='learning-card-prev'>
            <ArrowBackIos onClick={() => this.setCountMinus()} className='prev' />
          </div>
          <div className='learning-card'>
            <div className='learning-card-header'>
              <div className='current-word'>
                <div className='current-success'>
                  <div style={{ color: colorDots }}>
                    <span>&#10687;</span>
                    <span>&#10687;</span>
                    <span>&#10687;</span>
                    <span>&#10687;</span>
                    <span>&#10687;</span>
                  </div>
                  <span className='learning-word-description'>{description}</span>
                </div>
                <div className='page-and-category'>
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
                  <Flag onClick={this.toggleDropdown} />
                </div>
              </div>
            </div>
            <div className='learning-card-main'>
              <div className='learning-word-wrapper'>
                <div className='learning-word-info'>
                  <div className='learning-word-translation'>
                    {data.optional.translate ? translation : null}
                    <VolumeUp className='spell' onClick={() => this.playAudioWords(audioWord)} />
                  </div>
                  <div className='learning-word-transcription'>
                    {data.optional.transcription ? transcription : null}
                  </div>
                  <div className='learning-word-input'>
                    <div className='learning-check-input'>
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
                      <div className='check-input'>
                        {showAnswer ? this.checkAnswer(value, word) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className='learning-word-image'
                  src={data.optional.image ? image : disabled}
                  alt=''
                />
              </div>
              <div className='learning-word-examples'>
                <div className='learning-word-meaning'>
                  <div className='meaning-sentence' onClick={this.showMeaningWord}>
                    {!data.optional.description ? null : showMeaning ? meaning : meaningHide}
                  </div>
                  <VolumeUp onClick={() => this.playAudioWords(audioMeaning)} className='spell' />
                </div>
                <div className='learning-word-example'>
                  <div className='example-sentence' onClick={this.showExampleWord}>
                    {!data.optional.example ? null : showExample ? example : exampleHide}
                  </div>
                  <VolumeUp className='spell' onClick={() => this.playAudioWords(audioExample)} />
                </div>
                <div className='meaning-translate'>
                  {!data.optional.description
                    ? null
                    : translateMeaningShow
                    ? meaningTranslate
                    : null}
                </div>
                <div className='example-translate'>
                  {!data.optional.example ? null : translateExampleShow ? exampleTranslate : null}
                </div>
              </div>
            </div>
          </div>
          <div className='learning-card-next'>
            <ArrowForwardIos onClick={this.setCountPlus} className='next' />
          </div>
        </div>
        <div className='button-reactions'>
          <Button
            variant='contained'
            className='learning-word-button-show'
            color='primary'
            onClick={this.getAnswer}>
            <span>Show answer</span>
          </Button>
          <Button
            variant='contained'
            className='learning-word-button-check'
            color='primary'
            onClick={this.setCountPlus}>
            <span>Next card</span>
          </Button>
        </div>
        <div className='learning-word-notification'>{notification}</div>
        <div className='learning-word-stage'>
          <div className='number-start'>0</div>
          <div className='number-progress'>
            <LinearProgress variant='determinate' value={progress} />
          </div>
          <div className='number-end'>{this.state.lastNumber}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ appStateReducer: { data }, authReducer: { token, userId } }) => {
  return { data, userId, token };
};

export default connect(mapStateToProps)(WordCards);
