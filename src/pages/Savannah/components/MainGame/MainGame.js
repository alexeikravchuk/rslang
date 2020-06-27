import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import GameToolbar from "../GameToolbar/Toolbar";
import Background from "../background/Background";
import {Statistics} from "../Statistics";
import {
  gameEnding,
  LIFE_DECREASE, lifeDecrease,
  loadWords,
  loadWordsSuccess,
} from "../../../../store/actions/savannahAction";
import {getWords} from "../../utils/wordRequest";
import {StartGame} from "../StartGame";
import GameButtonGroup from "../ButtonGroup/ButtonGroup";
import TrainWord from "../TrainWord/TrainWord";
import {ADD_LEARNED_WORDS, ADD_MISSED_WORDS} from "../../../../store/actions";

const styles ={
  root: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center'

  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    color: "#662246",
  }
}

class MainGame extends Component{
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GameToolbar title={'Savannah game'} />
        <Container className={classes.root}>
          {this.props.gameStarted === false && <StartGame />}
          {this.props.gameEnd && <Statistics />}
          {this.props.gameStarted && <GameButtonGroup
            fetch={this.props.fetchWords}
            visible={true}
          />}
        </Container>
        <Background />
      </div>
    )
  }
}

function mapStateToProps(store){
  const { savannahReducer } = store
  return { ...savannahReducer }
}

const mapDispatchToProps = dispatch => ({
  fetchWords: (page, category) => {
    dispatch(loadWords())
    getWords(page, category)
      .then(json => dispatch(loadWordsSuccess(json)))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainGame));