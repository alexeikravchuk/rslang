import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles, Container, Slide} from '@material-ui/core';
import {randomInteger, shuffleArray} from '../../utils/utils'
import {SavannahButton} from '../SavannahButton';
import TrainWord from '../TrainWord/TrainWord';
import {
  addLearnedWords, addMissedWords,
  gameEnding,
  lifeDecrease, removeWord,
} from '../../../../store/actions/savannahAction';
import Grid from '@material-ui/core/Grid';

const wordsLimit = 30;
const buttonLimit = 4;

const styles = {
  groupRoot: {
    height: '100%'
  },
  trainWord:{
    height: '45vh'
  },
  buttonGroupContainer:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

const defaultState = {
  showWord: false,
  animationEnded: true,
  chosenWord: '',
}

class GameButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWord: false,
      animationEnded: true,
      chosenWord: '',
      trainWord:'',
    };
  }

  loadNewWords(){
    if(this.props.newWords.length < 5) {
      this.props.fetch(randomInteger(0,wordsLimit), this.props.difficulty);
    }
  }

  missAtAnimationEnd(word){
    this.props.onMiss(this.props.lifeCounter, word);
  }

  setEnd = () => {
    if (this.state.chosenWord === '') {this.missAtAnimationEnd(this.state.trainWord)}
    this.props.onRemove(this.state.trainWord);
    this.loadNewWords();
    this.setState(defaultState);
    setTimeout(() => this.setState({showWord: true}), 200)
  }

  setStart = () => {
    this.setState({animationEnded: false, showWord: true, trainWord: this.props.newWords[0]});
  }

  checkWord(wordToCheck){
    const {trainWord} = this.state;
    return (wordToCheck === trainWord.word) ? this.props.onGuess(trainWord) : this.props.onMiss(this.props.lifeCounter, trainWord);
  }

  onClick(word){
    this.checkWord(word);
    this.props.onRemove(this.state.trainWord);
    this.loadNewWords();
    this.setState(defaultState);
    this.timer = setTimeout(() => this.setState({showWord: true}), 200)
  }

  componentDidMount() {
    this.props.fetch(randomInteger(0,wordsLimit), this.props.difficulty);
    this.setState({showWord: true})
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  render() {
    const { classes, newWords, } = this.props;
    return (
        <Grid
          container
          direction={'column'}
          justify="space-between"
          alignItems="center"
          className={classes.groupRoot}
          xs={12}
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
            <Slide direction={'up'} in={this.state.showWord}>
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
                    )
                  })}
                </Grid>
              </Container>
            </Slide>}
          </Grid>
        </Grid>
    )
  }
}

function mapStateToProps(store){
  const { savannahReducer } = store
  return { ...savannahReducer }
}

const mapDispatchToProps = dispatch => ({
  onMiss: (lifeCounter, missedWord) => {
    dispatch(addMissedWords(missedWord));
    (lifeCounter < 1) ? dispatch(gameEnding()) : dispatch(lifeDecrease())
  },
  onGuess: (learnedWord) => {
    dispatch(addLearnedWords(learnedWord))
  },
  onRemove: (word) => {
    dispatch(removeWord(word))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GameButtonGroup))
