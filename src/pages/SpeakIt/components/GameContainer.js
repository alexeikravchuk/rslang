import React, { Component } from 'react';
import { Backdrop, withStyles } from '@material-ui/core';
import { Intro } from './Intro';
import backdropBackgroundImg from '../../../assets/game-background.jpg';
import { MainPage } from './MainPage';

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      level: {
        current: 1,
        maxLevel: 6,
      },
    };
  }

  startBtnClickHandler() {
    this.setState({ gameStarted: true });
  }

  render() {
    return (
      <Backdrop className={this.props.classes.backdrop} open={true}>
        {!this.state.gameStarted && <Intro
          open={!this.state.gameStarted}
          onClick={() => this.startBtnClickHandler()}
        />}
        {this.state.gameStarted && <MainPage level={this.state.level} />}
      </Backdrop>
    );
  }
}

function createStyles(theme) {
  return {
    backdrop: {
      position: 'relative',
      marginTop: '56px',
      marginLeft: '56px',
      minHeight: 'calc(100vh - 56px)',
      width: 'calc(100vw - 56px)',
      background: `url(${backdropBackgroundImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      zIndex: 100,
    },
  };
}

export default withStyles(createStyles)(GameContainer);
