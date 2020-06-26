import React from 'react';
import { connect } from 'react-redux';
import './Card.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Stepper } from '../index';
import { checkAnswer } from '../../../../store/actions/sprintActions';
import { LEFW_ARROW_KEY_CODE, RIGHT_ARROW_KEY_CODE } from '../../constants/constants';

function GameCard({ sprintState, checkAnswer }) {
  const wordList = sprintState.gameWords;
  const word = wordList[sprintState.wordIndex].word;
  const wordTranslate = wordList[sprintState.translateIndex].wordTranslate;

  React.useEffect(() => {
    const onKeydown = e => {
      if (e.keyCode === LEFW_ARROW_KEY_CODE) {
        checkAnswer('right', sprintState)
      } else if (e.keyCode === RIGHT_ARROW_KEY_CODE) {
        checkAnswer('wrong', sprintState)
      }
    };
    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [checkAnswer, sprintState]);

  return (
    <Card className='root'>
      <Stepper />
      <CardContent className='content'>
        <Typography variant="h3" component="h3">
          {word}
        </Typography>
        <Typography variant="h5" component="h5">
          {wordTranslate}
        </Typography>
      </CardContent>
      <hr className='hr'/>
      <CardActions>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<KeyboardArrowLeftIcon />}
        value="right"
        onClick={(event) => checkAnswer(event.currentTarget.value, sprintState)}
        >
        right
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        endIcon={<KeyboardArrowRightIcon />}
        value="wrong"
        onClick={(event) => checkAnswer(event.currentTarget.value, sprintState)}
        >
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
