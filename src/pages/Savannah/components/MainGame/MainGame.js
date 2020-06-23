import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import GameToolbar from "../GameToolbar/Toolbar";
import Background from "../background/Background";
import {LIFE_DECREASE, loadWords, loadWordsSuccess} from "../../../../store/actions/savannahAction";
import {getWords} from "../../utils/wordRequest";

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
  componentDidMount() {
    this.props.fetchWords(1, 2);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GameToolbar title={'Savannah game'} />
        <Container className={classes.root}>
          <Button variant={'contained'} color={'primary'} onClick={this.props.onMiss}>
            {this.props.gameStarted ? 'Game is started': 'Game not started'}
          </Button>
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
  onMiss: () => {
    dispatch({type: LIFE_DECREASE})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainGame));