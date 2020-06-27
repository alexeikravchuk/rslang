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


const styles = {
  root:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

class GameButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWord: false,
    };
  }

  wordTranslate;
  onClick(word){
    this.setState({showWord: false});
    (word === this.props.newWords[0].word) ? this.props.onGuess(word) : this.props.onMiss(this.props.lifeCounter, word);
    this.props.onRemove(word);
    if( this.props.newWords.length < 8) {
      this.props.fetch(randomInteger(0, 30), this.props.difficulty)
    }
    setTimeout(() => this.setState({showWord: true}) , 500)
  }

  componentDidMount() {
    this.props.fetch(randomInteger(0,30), this.props.difficulty);
    this.setState({showWord: true});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {(this.props.newWords.length > 0 && this.state.showWord) &&
        <TrainWord currentWord={this.props.newWords[0].word}/>}
        {this.state.showWord && <Container className={classes.root}>
          {shuffleArray(this.props.newWords.slice(0, 4)).map((el, index) => {
            return <SavannahButton key={index} title={el.wordTranslate} onClick={() => this.onClick(el.word)}/>
          })}
        </Container>}
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