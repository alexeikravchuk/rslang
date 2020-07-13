import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Timer, Score, GameCard, WelcomeDialog, StatisticDialog } from './components';
import { ExitToApp, VolumeUp }from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton';
import { WORD_LANGUAGE, TRANSLATE_LANGUAGE } from './constants/constants'
import { endGame, checkAnswer } from '../../store/actions/sprintActions';


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'url(/images/backgrounds/SprintMiniGameBackground.jpg) center no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
  },
  volume: {
    width: '50px',
    height: '50px',
  }
});

function SprintMiniGame(props) {
  const classes = useStyles();

  const sayCardWord = (lang) => {
    const wordList = props.sprintState.gameWords;
    const word = wordList[props.sprintState.wordIndex].word;
    const wordTranslate = wordList[props.sprintState.translateIndex].wordTranslate;
    const synth = window.speechSynthesis || window.mozspeechSynthesis || window.webkitspeechSynthesis;
    const message = new SpeechSynthesisUtterance();
    message.lang = lang;
    message.text = message.lang === WORD_LANGUAGE ? word : wordTranslate;
    synth.speak(message);
  };

  if (props.sprintState.showCard) {
    return (
      <div
        className={classes.container}
        >
        <Timer />
        <Score />
        <GameCard />
        <IconButton
          onClick={(e) => {
            sayCardWord(WORD_LANGUAGE)
            sayCardWord(TRANSLATE_LANGUAGE)
          }}
        >
          <VolumeUp style={{ fontSize: 30 }} />
        </IconButton>
        <IconButton
          component={Link}
          to='/home'
          onClick={props.endGame}
        >
          <ExitToApp style={{ fontSize: 30 }}/>
        </IconButton>
      </div>
    )
  }

  if (props.sprintState.showStatistic) {
    return (
      <div className={classes.container}>
        <StatisticDialog />
      </div>
    );
  }

  if (!props.sprintState.showCard) {
    return (
      <div className={classes.container}>
      <WelcomeDialog />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sprintState: state.sprintReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    endGame: () => dispatch(endGame()),
    checkAnswer: (btnValue, sprintState) => dispatch(checkAnswer(btnValue, sprintState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SprintMiniGame)
