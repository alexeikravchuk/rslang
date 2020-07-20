import React from 'react';
import PropTypes from 'prop-types';

import { Fade, withStyles, Button } from '@material-ui/core';

const Intro = ({ open, classes, onClick }) => (
  <Fade in={open}>
    <div className={classes.paper}>
      <h1 className='title'>Speak It</h1>
      <p className={classes.paper}>
        Click on the words to hear them sound.
        <br />
        Click on the button and speak the words into the microphone.
      </p>
      <Button variant='contained' color='primary' onClick={onClick}>
        <span>Start</span>
      </Button>
    </div>
  </Fade>
);

Intro.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

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
      marginBottom: '10px',
    },
  };
}

export default withStyles(createStyles)(Intro);
