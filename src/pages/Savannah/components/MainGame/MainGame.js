import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import GameToolbar from "../GameToolbar/Toolbar";
import Background from "../background/Background";
import {Statistics} from "../Statistics";
import {
  gameEnding,
  loadWords,
  loadWordsSuccess,
} from "../../../../store/actions/savannahAction";
import {getWords} from "../../utils/wordRequest";
import {StartGame} from "../StartGame";
import GameButtonGroup from "../ButtonGroup/ButtonGroup";

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
        <GameToolbar title={''} onClose={this.props.onClose}/>
        <Container className={classes.root}>
          {this.props.gameStarted === false && <StartGame />}
          {this.props.gameEnd && <Statistics />}
          {(this.props.gameStarted && !this.props.gameEnd) && <GameButtonGroup
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
  onClose: ()=> dispatch(gameEnding())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainGame));