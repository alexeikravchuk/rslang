import React, { Component } from 'react';
import { Backdrop, withStyles } from '@material-ui/core';
import { Intro } from './Intro';
import { MainPage } from './MainPage';

import backdropBackgroundImg from '../../../assets/game-background.jpg';

class Game extends Component {
  state = {
    gameStarted: false,
  };

  handleBtnClick = () => {
    this.setState({ gameStarted: true });
  };

  render() {
    const { classes } = this.props;
    const { gameStarted } = this.state;
    return (
      <Backdrop className={classes.backdrop} open={true}>
        {!gameStarted && <Intro open={!gameStarted} onClick={this.handleBtnClick} />}
        {gameStarted && <MainPage />}
      </Backdrop>
    );
  }
}

function createStyles() {
  return {
    backdrop: {
      position: 'relative',
      minHeight: '100%',
      overflowX: 'hidden',
      width: '100%',
      background: `url(${backdropBackgroundImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      zIndex: 100,
    },
  };
}

export default withStyles(createStyles)(Game);
