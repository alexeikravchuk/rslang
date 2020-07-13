import React, { Component } from 'react';
import { Paper, withStyles, Box, Typography } from '@material-ui/core';
import {SelectGame} from './SelectGame';
import {
  SportsEsports,
  SignalCellularAlt,
  Mood,
  SentimentDissatisfied
} from '@material-ui/icons';

class GamesStatistic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      difficulty: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Box className={classes.captions}>
          <SportsEsports color='secondary' />
          <Typography variant="h5">
             Games
          </Typography>
        </Box>
        <Paper className={classes.paper}>
          <SelectGame />
          <div className={classes.info}>
            <SignalCellularAlt className={classes.icons}/>
            <Typography  variant="button">Difficulty level: <span>{this.state.difficulty}</span></Typography>
          </div>
          <div className={classes.info}>
            <Mood className={classes.icons}/>
            <Typography  variant="button">Correct answers: <span>{this.state.correctAnswers}</span></Typography>
          </div>
          <div className={classes.info}>
            <SentimentDissatisfied className={classes.icons}/>
            <Typography  variant="button">Wrong answers: <span>{this.state.wrongAnswers}</span></Typography>
          </div>            
        </Paper>
      </div>
    );
  }
}

function createStyles(theme) {
  return {
    paper: {
        height: 'auto',
        width: 'auto',
        maxHeight: '100%',
        textAlign: 'left',
        margin: theme.spacing(3),
        padding: theme.spacing(3),
  
    },
    icons:{
      marginRight: theme.spacing(3),
    },
    captions:{      
      textAlign: 'center',
    },
    info:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'left',
      margin: theme.spacing(2,0),
    }
  };
}

export default withStyles(createStyles)(GamesStatistic);
