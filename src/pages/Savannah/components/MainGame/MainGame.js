import React from "react";
import Box from "@material-ui/core/Box";
import Background from "../background/Background";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";

const styles ={
  root: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center'
  },
}

function MainGame(props) {
  const {classes} = props;
  return (
    <div>
      <Container className={classes.root}>
        
      </Container>
      <Background />
    </div>
  )
}

export default withStyles(styles)(MainGame);