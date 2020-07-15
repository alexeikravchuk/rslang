import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles, Container, Grid, Zoom} from '@material-ui/core';
import {pubAudioPath, shuffleArray} from '../../utils/utils';
import {SavannahButton} from '../SavannahButton';
import TrainWord from '../TrainWord/TrainWord';
import {
  addLearnedWords, addMissedWords, addPoints,
  gameEnding, levelUp,
  lifeDecrease, removeWord, resetPoints,
} from '../../../../store/actions/savannahAction';

const buttonLimit = 4;
const correct = pubAudioPath('correct');
const errorSound = pubAudioPath('error');
const levelUpSound = pubAudioPath('levelUp');

const audioSounds = {
  correct: new Audio(correct),
  errorSound: new Audio(errorSound),
  levelUpSound: new Audio(levelUpSound),
};

const playSound = audioFile => {
  audioFile.play();
};

const styles = {
  groupRoot: {
    height: '100%',
  },
  trainWord: {
    height: '45vh',
  },
  buttonGroupContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
};

const defaultState = {
  showWord: false,
  animationEnded: true,
  chosenWord: '',
};

class GameButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWord: false,
      animationEnded: true,
      nextLevel: false,
      chosenWord: '',
      trainWord: '',
    };
  }

  loadNewWords() {
    if ((this.props.gameLevel < 30) && (this.props.newWords.length <= buttonLimit)) {
      this.props.fetch(this.props.gameLevel, this.props.difficulty);
    }
  }

  missAtAnimationEnd(word) {
    this.props.onMiss(this.props.lifeCounter, word);
    this.loadNewWords();
  }

  setEnd = () => {
    if (this.state.chosenWord === '') {
      playSound(audioSounds.errorSound);
      this.missAtAnimationEnd(this.state.trainWord);
    }
    this.props.onRemove(this.state.trainWord);
    this.setState(defaultState);
    setTimeout(() => this.setState({showWord: true}), 200);
  };

  setStart = () => {
    this.setState({animationEnded: false, showWord: true, trainWord: this.props.newWords[0]});
  };

  checkWord(wordToCheck) {
    const {trainWord} = this.state;
    if (wordToCheck === trainWord.word) {
      this.props.onGuess(trainWord);
      this.props.addProgress();
      playSound(audioSounds.correct);
      if (this.props.gamePoints === 100) {
        playSound(audioSounds.levelUpSound);
        this.props.onLevelUp();
        this.props.resetProgress();
      }
    } else {
      playSound(audioSounds.errorSound);
      this.props.onMiss(this.props.lifeCounter, trainWord);
    }
  }

  onClick(word) {
    this.checkWord(word);
    this.loadNewWords();
    this.props.onRemove(this.state.trainWord);
    this.setState(defaultState);
    this.timer = setTimeout(() => this.setState({showWord: true}), 200);
  }

  componentDidMount() {
    this.loadNewWords();
    this.setState({showWord: true});
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const {classes, newWords} = this.props;
    return (
      <Grid
        container
        direction={'column'}
        justify="space-between"
        alignItems="center"
        className={classes.groupRoot}
      >
        <Grid item className={classes.trainWord}>
          {(newWords.length > 0 && this.state.showWord) &&
          <TrainWord
            currentWord={newWords[0]}
            onAnimationStart={this.setStart.bind(this)}
            onAnimationEnd={this.setEnd.bind(this)}
          />}
        </Grid>
        <Grid item xs={12}>
          {this.state.showWord &&
          <Zoom in={this.state.showWord}>
            <Container className={classes.buttonGroupContainer}>
              <Grid container
                    spacing={2}
                    justify='center'
                    alignItems='center'>
                {shuffleArray(newWords.slice(0, buttonLimit)).map((el, index) => {
                  return (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <SavannahButton keyId={el.id}
                                      title={el.wordTranslate}
                                      onClick={() => this.onClick(el.word)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </Zoom>}
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(store) {
  const {savannahReducer} = store;
  return {...savannahReducer};
}

const mapDispatchToProps = dispatch => ({

  addProgress: () => {
    dispatch(addPoints(10));
  },
  resetProgress: () => {
    dispatch(resetPoints());
  },
  onLevelUp: () => {
    dispatch(levelUp());

  },
  onMiss: (lifeCounter, missedWord) => {
    dispatch(addMissedWords(missedWord));
    (lifeCounter < 1) ? dispatch(gameEnding()) : dispatch(lifeDecrease());
  },
  onGuess: (learnedWord) => {
    dispatch(addLearnedWords(learnedWord));
  },
  onRemove: (word) => {
    dispatch(removeWord(word));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GameButtonGroup));
