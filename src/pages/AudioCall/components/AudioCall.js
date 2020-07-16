import React, { Component } from 'react';
import audiocallBackground from '../../../assets/audiocall-background.jpg';
import { Backdrop, withStyles } from '@material-ui/core';
import { Intro } from './Intro';
import { GameSettings } from './GameSettings';
import { MainGame } from './MainGame';

class AudioCall extends Component {
  state = {
    gameStarted: false,
    difficulty: 1,
    round: 1,
  };

  сhangeDifficulty = (e, value) => {
    this.setState({ difficulty: value });
  };

  сhangeRound = (e, value) => {
    this.setState({ round: value });
  };

  gameStarts = () => {
    const { difficulty, round } = this.state;
    this.setState({
      gameStarted: true,
      difficulty,
      round,
    });
  };

  gameEnds = () => {
    this.setState({
      gameStarted: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { gameStarted } = this.state;
    const show = gameStarted ? (
      <MainGame {...this.state} gameEnds={this.gameEnds} />
    ) : (
      <div>
        <Intro gameStarts={this.gameStarts} />
        <GameSettings сhangeDifficulty={this.сhangeDifficulty} сhangeRound={this.сhangeRound} />
      </div>
    );

    return (
      <Backdrop className={classes.backdrop} open={true}>
        {show}
      </Backdrop>
    );
  }
}

function createStyles() {
  return {
    backdrop: {
      position: 'relative',
      minHeight: '100%',
      overflowY: 'hidden',
      width: '100%',
      background: `url(${audiocallBackground})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      zIndex: 100,
    },
  };
}

export default withStyles(createStyles)(AudioCall);
