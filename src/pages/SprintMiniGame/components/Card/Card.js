import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Stepper } from '../index';
import { checkAnswer } from '../../../../store/actions/sprintActions';

const useStyles = makeStyles({
  root: {
    minWidth: 475,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  hr: {
    width: '90%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

});

function GameCard({ sprintState, checkAnswer }) {
  const classes = useStyles();
  const wordList = sprintState.gameWords;
  const word = wordList[sprintState.wordIndex].word;
  const wordTranslate = wordList[sprintState.translateIndex].wordTranslate;

  return (
    <Card className={classes.root}>
      <Stepper />
      <CardContent className={classes.content}>
        <Typography variant="h3" component="h3">
          {word}
        </Typography>
        <Typography variant="h5" component="h3">
          {wordTranslate}
        </Typography>
      </CardContent>
      <hr className={classes.hr}/>
      <CardActions>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<KeyboardArrowLeftIcon />}
        value="right"
        onClick={(event) => checkAnswer(event.currentTarget.value, sprintState)}>
        right
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        endIcon={<KeyboardArrowRightIcon />}
        value="wrong"
        onClick={(event) => checkAnswer(event.currentTarget.value, sprintState)}>
        wrong
      </Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    sprintState: state.sprintReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAnswer: (btnValue, sprintState) => dispatch(checkAnswer(btnValue, sprintState))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GameCard)
