import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import GameToolbar from "../GameToolbar/Toolbar";
import Background from "../background/Background";
import {Statistics} from "../Statistics";
import {LIFE_DECREASE,gameEnding, loadWords, loadWordsSuccess} from "../../../../store/actions/savannahAction";
import {getWords} from "../../utils/wordRequest";
import {StartGame} from "../StartGame";

const styles ={
  root: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center'

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
          <Button variant={'contained'} color={'primary'} onClick={() => this.props.onMiss(this.props.lifeCounter)}>
            {this.props.gameStarted ? 'I am missed': 'Game not started'}
          </Button>
          {this.props.gameStarted === false && <StartGame />}
          {this.props.gameEnd && <Statistics />}
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
  onMiss: (lifeCounter) => {
    (lifeCounter === 0) ? dispatch(gameEnding()): dispatch({type: LIFE_DECREASE}
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainGame));