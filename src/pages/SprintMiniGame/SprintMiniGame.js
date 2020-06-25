import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Timer, Score, GameCard, WelcomeDialog, StatisticDialog } from './components/index';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { WORD_LANGUAGE, TRANSLATE_LANGUAGE } from '../../pages/SprintMiniGame/constants/constants'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'url(/images/backgrounds/SprintMiniGameBackground.jpg) center no-repeat',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
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
      <div className={classes.container}>
        <Timer />
        <Score />
        <GameCard />
        <IconButton
          onClick={(e) => {
            sayCardWord(WORD_LANGUAGE)
            sayCardWord(TRANSLATE_LANGUAGE)
          }}
        >
          <VolumeUpIcon style={{ fontSize: 60 }} />
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

export default connect(mapStateToProps, null)(SprintMiniGame)
