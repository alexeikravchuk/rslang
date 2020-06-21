import React from "react";
import Background from "../background/Background";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import GameToolbar from "../GameToolbar/Toolbar";


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

function MainGame(props) {
  const {classes} = props;
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

export default withStyles(styles)(MainGame);