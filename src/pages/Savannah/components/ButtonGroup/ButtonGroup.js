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
  lifeDecrease, reload
} from "../../../../store/actions/savannahAction";

const styles = {
  root:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

class GameButtonGroup extends Component {

  wordTranslate;
  onClick(word){
    (word === this.props.newWords[0].word) ? this.props.onGuess(word) : this.props.onMiss(this.props.lifeCounter, word)
  }

  componentDidMount() {
    this.props.fetch(randomInteger(0,30), this.props.difficulty)
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.newWords.length > 0 && <TrainWord currentWord={this.props.newWords[0].word}/>}
        <Container className={classes.root}>
          {this.props.newWords.slice(0, 4).map((el, index) => {
            return <SavannahButton key={index} title={el.wordTranslate} onClick={()=> this.onClick(el.word)}/>
          })}
        </Container>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GameButtonGroup))