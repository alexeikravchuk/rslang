import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import GameToolbar from "../GameToolbar/Toolbar";
import Background from "../background/Background";
import {loadWords, loadWordsSuccess} from "../../../../store/actions/savannahAction";
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
    console.log(`my props ${this.props}`)
    return (
      <div>
        <GameToolbar title={'Savannah game'} />
        <Container className={classes.root}>
          <Button variant={'contained'} color={'primary'}>
            i am a big button
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainGame));