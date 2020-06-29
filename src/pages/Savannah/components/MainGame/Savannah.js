import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import GameToolbar from "../GameToolbar/Toolbar";
import {Statistics} from "../Statistics";
import {
  gameEnding,
  loadWords,
  loadWordsSuccess,
} from "../../../../store/actions/savannahAction";
import {getWords} from "../../utils/wordRequest";
import {StartGame} from "../StartGame";
import GameButtonGroup from "../ButtonGroup/ButtonGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import './savannah.scss'


const styles = {
  root: {
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    color: "#662246",
  },
  loader: {
    position: 'relative',
    zIndex: 2001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height:'80vh',
    width: '100%'
  }
}

class Savannah extends Component{
  loader(classes) {
    return (
      <Container className={classes}>
        <CircularProgress />
      </Container>
    )
  }
  render() {
    const { classes } = this.props;
    return (
      <div  className={'mainGame'}>
        {this.props.loading && this.loader(classes.loader)}
        {<GameToolbar title={''} onClose={this.props.onClose}/>}
        <Container className={'savannahRoot'}>
          {this.props.gameStarted === false && <StartGame />}
          {this.props.gameEnd && <Statistics />}
          {(this.props.gameStarted && !this.props.gameEnd) && <GameButtonGroup
            fetch={this.props.fetchWords}
            visible={true}
          />}
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
  fetchWords: (page, category) => {
    dispatch(loadWords())
    getWords(page, category)
      .then(json => dispatch(loadWordsSuccess(json)))
  },
  onClose: ()=> dispatch(gameEnding())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Savannah));