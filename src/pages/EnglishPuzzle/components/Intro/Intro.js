import React from 'react';
import PropTypes from 'prop-types';

import { Fade, withStyles, Button } from '@material-ui/core';

const Intro = ({ open, classes, onClick }) => (
  <Fade in={open}>
    <div className={classes.paper}>
      <h1 className='title'>ENGLISH PUZZLE</h1>
      <p className='text'>
        Click on words, collect phrases.
        <br />
        Words can be drag and drop. Select tooltips in the menu
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
    },
  };
}

export default withStyles(createStyles)(Intro);
