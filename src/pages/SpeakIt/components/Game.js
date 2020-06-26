import React, { Component } from 'react';
import { Backdrop, withStyles } from '@material-ui/core';
import { Intro } from './Intro';
import { MainPage } from './MainPage';

import backdropBackgroundImg from '../../../assets/game-background.jpg';

class Game extends Component {
  state = {
    gameStarted: false,
  };

  startBtnClickHandler() {
    this.setState({ gameStarted: true });
  }

  render() {
    return (
      <Backdrop className={this.props.classes.backdrop} open={true}>
        {!this.state.gameStarted && (
          <Intro
            open={!this.state.gameStarted}
            onClick={() => this.startBtnClickHandler()}
          />
        )}
        {this.state.gameStarted && <MainPage level={this.state.level} />}
      </Backdrop>
    );
  }
}

function createStyles() {
  return {
    backdrop: {
      position: 'relative',
      marginTop: '48px',
      marginLeft: '54px',
      minHeight: 'calc(100vh - 48px)',
      overflowX: 'hidden',
      width: 'calc(100% - 54px)',
      background: `url(${backdropBackgroundImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      zIndex: 100,
    },
  };
}

export default withStyles(createStyles)(Game);
