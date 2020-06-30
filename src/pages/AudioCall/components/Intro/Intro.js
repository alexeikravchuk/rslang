import React, { Component} from 'react';
import { Fade, withStyles, Button } from '@material-ui/core';


class Intro extends Component{
    constructor(props){
        super(props)
        this.gameStatus = true; 
    }

render(){
    const { classes } = this.props;
   return(
    <Fade in={this.gameStatus}>
        <div className={classes.paper}>
          <h1 className='title'>Speak It</h1>
          <p className='text'>
            Click on the words to hear them sound.
            <br />
            Click on the button and speak the words into the microphone.
          </p>
          <Button variant='contained' color='primary' onClick>
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
      color: '#fff899',
      textAlign: 'center',
      textShadow: '0 2px 4px #8f83ff',
      padding: theme.spacing(26, 4, 3),
    },
    text: {
      opacity: '.8',
    },
  };
}

export default withStyles(createStyles)(Intro);
