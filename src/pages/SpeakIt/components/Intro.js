import React, { Component } from 'react';
import { Fade, Backdrop, withStyles, Button } from '@material-ui/core';
import backdropBackgroundImg from '../../../assets/game-background.jpg';

class Intro extends Component {
  render() {
    return (
      <Backdrop className={this.props.classes.backdrop} open={this.props.open}>
        <Fade in={this.props.open}>
          <div className={this.props.classes.paper}>
            <h1 className='title'>Speak It</h1>
            <p className='text'>
              Click on the words to hear them sound.
              <br />
              Click on the button and speak the words into the microphone.
            </p>
            <Button
              variant='contained'
              color='primary'
              onClick={() => this.props.onClick()}>
              <span>Start</span>
            </Button>
          </div>
        </Fade>
      </Backdrop>
    );
  }
}

function createStyles(theme) {
  return {
    paper: {
      color: '#fff899',
      textAlign: 'center',
      textShadow: '0 2px 4px #8f83ff',
      padding: theme.spacing(2, 4, 3),
    },
    text: {
      opacity: '.8',
    },
    backdrop: {
      background: `url(${backdropBackgroundImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
  };
}

export default withStyles(createStyles)(Intro);
