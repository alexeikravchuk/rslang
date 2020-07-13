import React, { Component } from 'react';
import { Paper, withStyles, Box, Typography } from '@material-ui/core';
import {
  MenuBook,
  AssignmentTurnedIn,
  BorderColor,
  Filter9Plus,
  DoneOutline,
} from '@material-ui/icons';

class CardsStatistic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      words: 0,
      cards: 0,
      chain: 0,
      correct: 0,
    };
  }
  render() {
    const { classes } = this.props;
    return (
            <div>
              <Box className={classes.captions}>
                <MenuBook color='primary' />
                <Typography variant="h5">
                   Word cards
                </Typography>
              </Box>
              <Paper className={classes.paper}>
                <div className={classes.info}>
                  <BorderColor className={classes.icons}/>
                  <Typography  variant="button">Learned words: <span>{this.state.words}</span></Typography>
                </div>
                <div className={classes.info}>
                  <AssignmentTurnedIn className={classes.icons}/>
                  <Typography  variant="button">Cards Completed: <span>{this.state.cards}</span></Typography>
                </div>
                <div className={classes.info}>
                  <Filter9Plus className={classes.icons}/>
                  <Typography  variant="button">Best chain answers: <span>{this.state.chain}</span></Typography>
                </div>
                <div className={classes.info}>
                  <DoneOutline className={classes.icons}/>
                  <Typography  variant="button">Correct answers: <span>{this.state.correct}</span></Typography>
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
        padding: theme.spacing(6),
  
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

export default withStyles(createStyles)(CardsStatistic);
