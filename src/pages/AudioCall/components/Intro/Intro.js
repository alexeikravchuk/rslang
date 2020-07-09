import React, { Component} from 'react';
import { Fade, withStyles, Button } from '@material-ui/core';

class Intro extends Component{
render(){
    const { classes, gameStarts } = this.props;
   return(
    <Fade in={true}>
        <div className={classes.paper}>
          <h1 className='title'>Audio Call</h1>
          <p className='text'>
            Listen the words and select correct answer
          </p>
          <Button variant='contained' color='primary' onClick={gameStarts}>
            <span>Start</span>
          </Button>
        </div>
      </Fade>
    )    
 };
}

function createStyles(theme) {
  return {
    paper: {
      color: '#1b1a20', 
      textAlign: 'center',
      textShadow: '0 2px 4px #fff899',
      padding: theme.spacing(0, 0, 0),
    },
    text: {
      opacity: '.8',
    },
  };
}

export default withStyles(createStyles)(Intro);
