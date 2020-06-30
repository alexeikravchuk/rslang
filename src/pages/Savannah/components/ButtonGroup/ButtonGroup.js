import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import {randomInteger, shuffleArray} from '../../utils/utils'
import {SavannahButton} from "../SavannahButton";
import TrainWord from "../TrainWord/TrainWord";
import {
  addLearnedWords, addMissedWords,
  gameEnding,
  lifeDecrease, removeWord,
} from "../../../../store/actions/savannahAction";
import Slide from "@material-ui/core/Slide";

const styles = {
  root:{
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
    this.setEnd = this.setEnd.bind(this)
    this.setStart = this.setStart.bind(this)
    this.state = {
      showWord: false,
      animationEnded: true,
      chosenWord: '',
      trainWord:'',
    };
  }

  loadNewWords(){
    if(this.props.newWords.length < 5) {
      this.props.fetch(randomInteger(0,30), this.props.difficulty);
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

  wordTranslate;

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
    this.props.fetch(randomInteger(0,30), this.props.difficulty);
    this.setState({showWord: true})
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {(this.props.newWords.length > 0 && this.state.showWord) &&
        <TrainWord
          currentWord={this.props.newWords[0]}
          onAnimationStart={this.setStart.bind(this)}
          onAnimationEnd={this.setEnd.bind(this)}
        />}
        {this.state.showWord &&
        <Slide direction={'up'} in={this.state.showWord}>
          <Container className={classes.root}>
          {shuffleArray(this.props.newWords.slice(0, 4)).map((el) => {
            return (
                <SavannahButton key={el.id}
                                title={el.wordTranslate}
                                onClick={() => this.onClick(el.word)}
                />
              )
          })}
        </Container></Slide>}
      </div>
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
